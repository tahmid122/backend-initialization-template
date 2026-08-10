import { Package } from "../../../prisma/generated/prisma/client";
import { prisma } from "../../lib/prisma";

type PackageType = Omit<Package, "id" | "updatedAt" | "createdAt">;

const createPackage = async (data: PackageType) => {
  const createdPackage = await prisma.package.create({ data });
  return createdPackage;
};

export const packageService = { createPackage };
