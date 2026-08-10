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

export const supportController = { createSupport };
