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

const getAllPackages = async (query: Record<string, any>) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const packages = await prisma.package.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });
  const total = await prisma.package.count();
  return {
    meta: { page, limit, total, totalPage: Math.ceil(total / limit) },
    data: packages,
  };
};

const getSinglePackage = async (id: string) => {
  const singlePackage = await prisma.package.findUnique({ where: { id } });
  return singlePackage;
};

export const packageService = {
  createPackage,
  updatePackage,
  getAllPackages,
  getSinglePackage,
};
