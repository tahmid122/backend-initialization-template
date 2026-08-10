import {
  ServiceRequest,
  UserRole,
} from "../../../prisma/generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { JWT_USER } from "../../middlewares/auth";

type RequestService = Omit<
  ServiceRequest,
  "id" | "createdAt" | "updatedAt" | "status"
>;
const createRequest = async (data: RequestService, user: JWT_USER) => {
  const result = await prisma.serviceRequest.create({
    data: { ...data, userId: user.id },
  });

  return result;
};

const getAllRequests = async (query: Record<string, any>, user: JWT_USER) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  let result;
  let total;
  if (user.role === UserRole.USER) {
    result = await prisma.serviceRequest.findMany({
      where: { userId: user.id },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    });
    total = await prisma.serviceRequest.count({ where: { userId: user.id } });
  } else {
    result = await prisma.serviceRequest.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { user: true },
    });
    total = await prisma.serviceRequest.count();
  }

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: result,
  };
};

export const serviceRequestService = { createRequest, getAllRequests };
