import { Request, Response } from "express";
import { packageService } from "./package.service";

const createPackage = async (req: Request, res: Response) => {
  const result = await packageService.createPackage(req.body);
  res.status(201).send({
    success: true,
    message: "Package successfully created.",
    data: result,
  });
};

const updatePackage = async (req: Request, res: Response) => {
  const result = await packageService.updatePackage(
    req.body,
    req.params.id as string,
  );
  res
    .status(301)
    .send({ success: true, message: "Package updated.", data: result });
};

export const packageController = { createPackage, updatePackage };
