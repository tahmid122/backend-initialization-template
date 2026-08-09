import { Promotion } from "../../../prisma/generated/prisma/client";

//create promotion
const createPromotion = async (
  data: Omit<Promotion, "id" | "createdAt" | "updatedAt">,
) => {};

export const promotionService = { createPromotion };
