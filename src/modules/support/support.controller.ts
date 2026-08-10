import { Request, Response } from "express";
import { supportService } from "./support.service";
import { JWT_USER } from "../../middlewares/auth";

//create support
const createSupport = async (req: Request, res: Response) => {
  const result = await supportService.createSupport(
    req.body,
    req.user as JWT_USER,
  );
  res
    .status(201)
    .send({ success: true, message: "Support ticket created.", data: result });
};

//get all support tickets
const getAllSupportTickets = async (req: Request, res: Response) => {
  const result = await supportService.getAllSupportTickets(
    req.user as JWT_USER,
    req.query,
  );
  res.status(200).send(result);
};
export const supportController = { createSupport, getAllSupportTickets };
