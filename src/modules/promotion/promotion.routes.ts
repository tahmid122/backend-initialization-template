import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { promotionController } from "./promotion.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../prisma/generated/prisma/enums";

const router = Router();

//create promotion
router.post(
  "/",
  auth(UserRole.ADMIN),
  asyncHandler(promotionController.createPromotion),
);

export const promotionRoutes: Router = router;
