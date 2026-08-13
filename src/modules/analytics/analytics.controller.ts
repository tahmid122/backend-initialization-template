import { Request, Response } from "express";
import { analyticsService } from "./analytics.service";

const getAnalytics = async (req: Request, res: Response) => {
  const result = await analyticsService.getAnalytics();
  res
    .status(200)
    .send({ success: true, message: "Analytics retrieved.", data: result });
};

export const analyticsController = { getAnalytics };
