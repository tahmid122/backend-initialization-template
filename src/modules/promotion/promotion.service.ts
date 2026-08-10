import { Promotion } from "../../../prisma/generated/prisma/client";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/AppError";

//create promotion
const createPromotion = async (
  data: Omit<Promotion, "id" | "createdAt" | "updatedAt">,
) => {
  const promotion = await prisma.promotion.create({ data });

  return promotion;
};
//update promotion
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

  if (name !== undefined) updateData.name = name;
  if (availability !== undefined) updateData.availability = availability;
  if (chamber !== undefined) updateData.chamber = chamber;
  if (degree !== undefined) updateData.degree = degree;
  if (description !== undefined) updateData.description = description;
  if (designation !== undefined) updateData.designation = designation;
  if (phone !== undefined) updateData.phone = phone;
  if (image !== undefined) updateData.image = image;
  if (serves !== undefined) updateData.serves = serves;
  if (yearOfExperience !== undefined)
    updateData.yearOfExperience = yearOfExperience;

  const updatedPromotion = await prisma.promotion.update({
    where: { id },
    data: updateData,
  });

  return updatedPromotion;
};

//get all promotions
const getAllPromotions = async (query: Record<string, any>) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 12;
  const promotions = await prisma.promotion.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
  });
  const total = await prisma.promotion.count();
  return {
    meta: {
      page,
      limit,
      totalData: total,
      totalPages: Math.ceil(total / limit),
    },
    data: promotions,
  };
};

// get single promotion
const getSinglePromotion = async (id: string) => {
  const promotion = await prisma.promotion.findUnique({ where: { id } });
  return promotion;
};

//delete a promotion
const deleteAPromotion = async (id: string) => {
  const deletedPromotion = await prisma.promotion.delete({ where: { id } });
  return deletedPromotion;
};

//get all categories
const getAllCategories = async () => {
  const categories = await prisma.promotion.findMany({
    distinct: ["designation"],
    select: { designation: true },
  });
  const uniqueCategories = [
    ...new Set(categories.map((cat) => cat.designation)),
  ];

  return uniqueCategories;
};

export const promotionService = {
  createPromotion,
  updatePromotion,
  getAllPromotions,
  getSinglePromotion,
  deleteAPromotion,
  getAllCategories,
};
