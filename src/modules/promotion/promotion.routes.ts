import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { promotionController } from "./promotion.controller";

const router = Router();

//create promotion
router.post("/", asyncHandler(promotionController.createPromotion));

export const promotionRoutes: Router = router;
