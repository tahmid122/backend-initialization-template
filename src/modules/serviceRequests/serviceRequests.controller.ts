import { Request, Response } from "express";
import { serviceRequestService } from "./serviceRequests.service";
import { JWT_USER } from "../../middlewares/auth";

const createRequest = async (req: Request, res: Response) => {
  const result = await serviceRequestService.createRequest(
    req.body,
    req.user as JWT_USER,
  );
  res.status(201).send({
    success: true,
    message: "Request sent successfully",
    data: result,
  });
};

const getAllRequests = async (req: Request, res: Response) => {
  const result = await serviceRequestService.getAllRequests(
    req.query,
    req.user as JWT_USER,
  );
  res
    .status(200)
    .send({ success: true, message: "Request retrieved.", ...result });
};

export const serviceRequestController = { createRequest, getAllRequests };
