import { Promotion } from "../../../prisma/generated/prisma/client";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/AppError";

//create promotion
const createPromotion = async (
  data: Omit<Promotion, "id" | "createdAt" | "updatedAt">,
) => {
  const promotion = await prisma.promotion.create({ data });
  console.log(promotion);

  return promotion;
};
const updatePromotion = async (
  id: string,
  payload: Omit<Promotion, "id" | "createdAt" | "updatedAt">,
) => {
  const {
    name,
    availability,
    chamber,
    degree,
    description,
    designation,
    image,
    phone,
    serves,
    yearOfExperience,
  } = payload;

  const promotion = await prisma.promotion.findUnique({ where: { id } });
  if (!promotion) throw new AppError("Promotion data not found");
  const updateData: Omit<Promotion, "id" | "createdAt" | "updatedAt"> =
    {} as Omit<Promotion, "id" | "createdAt" | "updatedAt">;

  if (!name !== undefined) updateData.name = name;
  if (!availability !== undefined) updateData.availability = availability;
  if (!chamber !== undefined) updateData.chamber = chamber;
  if (!degree !== undefined) updateData.degree = degree;
  if (!description !== undefined) updateData.description = description;
  if (!designation !== undefined) updateData.designation = designation;
  if (!phone !== undefined) updateData.phone = phone;
  if (!image !== undefined) updateData.image = image;
  if (!serves !== undefined) updateData.serves = serves;
  if (!yearOfExperience !== undefined)
    updateData.yearOfExperience = yearOfExperience;

  const updatedPromotion = await prisma.promotion.update({
    where: { id },
    data: updateData,
  });

  return updatedPromotion;
};
export const promotionService = { createPromotion, updatePromotion };
