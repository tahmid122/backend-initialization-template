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

//get all promotions
const getAllPromotions = async (req: Request, res: Response) => {
  const result = await promotionService.getAllPromotions(req.query);
  res.status(200).send({ success: true, ...result });
};
//get single promotion
const getSinglePromotion = async (req: Request, res: Response) => {
  const result = await promotionService.getSinglePromotion(
    req.params.id as string,
  );
  res
    .status(200)
    .send({ success: true, message: "Promotion retrieved.", data: result });
};
//delete promotion
const deleteAPromotion = async (req: Request, res: Response) => {
  const result = await promotionService.deleteAPromotion(
    req.params.id as string,
  );
  res
    .status(204)
    .send({ success: true, message: "Promotion deleted", data: result });
};
//get all categories
const getAllCategories = async (req: Request, res: Response) => {
  const result = await promotionService.getAllCategories();
  res.status(200).send({
    success: true,
    message: "All categories retrieved.",
    data: result,
  });
};
export const promotionController = {
  createPromotion,
  updatePromotion,
  getAllPromotions,
  getSinglePromotion,
  deleteAPromotion,
  getAllCategories,
};
