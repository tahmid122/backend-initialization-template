import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { supportController } from "./support.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../prisma/generated/prisma/enums";

const router = Router();

//create support
router.post(
  "/",
  auth(UserRole.USER),
  asyncHandler(supportController.createSupport),
);

export const supportRoutes = router;
