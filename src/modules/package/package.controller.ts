import { Request, Response } from "express";
import { packageService } from "./package.service";

const createPackage = async (req: Request, res: Response) => {
  const result = await packageService.createPackage(req.body);
  res
    .status(201)
    .send({
      success: true,
      message: "Package successfully created.",
      data: result,
    });
};

export const packageController = { createPackage };
