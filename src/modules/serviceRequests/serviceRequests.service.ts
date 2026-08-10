import { ServiceRequest } from "../../../prisma/generated/prisma/client";
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

export const serviceRequestService = { createRequest };
