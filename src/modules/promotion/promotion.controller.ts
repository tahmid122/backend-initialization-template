import { Request, Response } from "express";
import { promotionService } from "./promotion.service";

//create promotion
const createPromotion = async (req: Request, res: Response) => {
  const result = await promotionService.createPromotion(req.body);
  res.status(201).send({
    success: true,
    message: "Promotion created successfully",
    data: result,
  });
};

export const promotionController = { createPromotion };
