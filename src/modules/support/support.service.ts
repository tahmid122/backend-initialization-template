import { Support } from "../../../prisma/generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { JWT_USER } from "../../middlewares/auth";

//create support
const createSupport = async (
  data: Pick<Support, "problem">,
  user: JWT_USER,
) => {
  const createdSupport = await prisma.support.create({
    data: { problem: data.problem, userId: user.id },
  });
  return createdSupport;
};

export const supportService = { createSupport };
