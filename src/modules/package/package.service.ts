import { Package } from "../../../prisma/generated/prisma/client";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/AppError";

type PackageType = Omit<Package, "id" | "updatedAt" | "createdAt">;

const createPackage = async (data: PackageType) => {
  const createdPackage = await prisma.package.create({ data });
  return createdPackage;
};

const updatePackage = async (payload: Partial<PackageType>, id: string) => {
  const { title, description, features, startPrice } = payload;
  const updateData: Partial<PackageType> = {};

  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (features !== undefined) updateData.features = features;
  if (startPrice && typeof startPrice !== "number") {
    throw new AppError("Start price must be number type.");
  }
  if (startPrice !== undefined) updateData.startPrice = startPrice;

  const updatedData = await prisma.package.update({
    where: { id },
    data: updateData,
  });
  return updatedData;
};

export const packageService = { createPackage, updatePackage };
