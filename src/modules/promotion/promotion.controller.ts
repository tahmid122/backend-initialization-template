import { Request, Response } from "express";
import { promotionService } from "./promotion.service";

//create promotion
const createPromotion = async (req: Request, res: Response) => {
  const result = promotionService.createPromotion(req.body);
};

export const promotionController = { createPromotion };
