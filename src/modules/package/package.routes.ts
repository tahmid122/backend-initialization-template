import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../prisma/generated/prisma/enums";
import asyncHandler from "../../utils/asyncHandler";
import { packageController } from "./package.controller";

const router = Router();

router.post(
  "/",
  auth(UserRole.ADMIN),
  asyncHandler(packageController.createPackage),
);

export const packageRoutes = router;
