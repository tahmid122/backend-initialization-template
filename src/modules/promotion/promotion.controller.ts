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

//update promotion
const updatePromotion = async (req: Request, res: Response) => {
  const result = await promotionService.updatePromotion(
    req.params.id as string,
    req.body,
  );
  res
    .status(301)
    .send({ success: true, message: "Promotion updated", data: result });
};
export const promotionController = { createPromotion, updatePromotion };
