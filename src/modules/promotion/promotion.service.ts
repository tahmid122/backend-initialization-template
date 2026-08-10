import { Promotion } from "../../../prisma/generated/prisma/client";
import { prisma } from "../../lib/prisma";

//create promotion
const createPromotion = async (
  data: Omit<Promotion, "id" | "createdAt" | "updatedAt">,
) => {
  const promotion = await prisma.promotion.create({ data });
  console.log(promotion);

  return promotion;
};

export const promotionService = { createPromotion };
