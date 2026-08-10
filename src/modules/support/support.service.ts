import { Support, UserRole } from "../../../prisma/generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { JWT_USER } from "../../middlewares/auth";

//create support
const createSupport = async (
  data: Pick<Support, "problem">,
  user: JWT_USER,
) => {
  const createdSupport = await prisma.support.create({
    data: { problem: data.problem, userId: user.id },
  });
  return createdSupport;
};
const getAllSupportTickets = async (
  user: JWT_USER,
  query: Record<string, any>,
) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  if (user.role === UserRole.USER) {
    const result = await prisma.support.findMany({
      where: { userId: user.id },
      skip: (page - 1) * limit,
      take: limit,
    });
    const total = await prisma.support.count({ where: { userId: user.id } });
    return {
      meta: { page, limit, total: total, totalPage: total / limit },
      data: result,
    };
  }
  const result = await prisma.support.findMany({
    include: { user: true },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
  });
  const total = await prisma.support.count();
  return {
    meta: { page, limit, total: total, totalPage: total / limit },
    data: result,
  };
};

export const supportService = { createSupport, getAllSupportTickets };
