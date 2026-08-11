import { UserRole } from "../../../prisma/generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/AppError";

const updateUserStatus = async (id: string) => {
  if (!id) throw new AppError("Id is required to change user status");
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new AppError("User not found with this id");
  if (user.role === UserRole.ADMIN)
    throw new AppError("Admin status can not be changed.");
  const updatedUser = await prisma.user.update({
    where: { id },
    data: { status: user.status === "ACTIVE" ? "BANNED" : "ACTIVE" },
  });

  return updatedUser;
};
export const userService = { updateUserStatus };
