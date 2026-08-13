import {
  Support,
  SupportStatus,
  UserRole,
} from "../../../prisma/generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { JWT_USER } from "../../middlewares/auth";
import AppError from "../../utils/AppError";

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

//get all support tickets
const getAllSupportTickets = async (
  user: JWT_USER,
  query: Record<string, any>,
) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const status = query.status || undefined;

  if (user.role === UserRole.USER) {
    const result = await prisma.support.findMany({
      where: { userId: user.id },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    });
    const total = await prisma.support.count({ where: { userId: user.id } });
    return {
      meta: { page, limit, total: total, totalPage: Math.ceil(total / limit) },
      data: result,
    };
  }
  const result = await prisma.support.findMany({
    where: { status: status },
    include: { user: true },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
  });
  const total = await prisma.support.count();
  return {
    meta: { page, limit, total: total, totalPage: Math.ceil(total / limit) },
    data: result,
  };
};

//update support ticket
const updateSupportTicket = async (
  payload: { status?: SupportStatus; adminReply?: string },
  id: string,
) => {
  const { status, adminReply } = payload;
  if (status && !Object.keys(SupportStatus).includes(status)) {
    throw new AppError(
      `Status must be ${Object.keys(SupportStatus).join(" | ")}`,
    );
  }
  const updateData = {} as { status?: SupportStatus; adminReply?: string };

  if (status !== undefined) updateData.status = status;
  if (adminReply !== undefined) updateData.adminReply = adminReply;

  const updatedSupportTicket = await prisma.support.update({
    where: { id: id },
    data: updateData,
  });
  return updatedSupportTicket;
};

export const supportService = {
  createSupport,
  getAllSupportTickets,
  updateSupportTicket,
};
