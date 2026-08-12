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

const deleteRequest = async (req: Request, res: Response) => {
  const result = await serviceRequestService.deleteRequest(
    req.params.id as string,
    req.user as JWT_USER,
  );
  res.status(201).send({
    success: true,
    message: "Request successfully deleted",
    data: result,
  });
};

const updateStatus = async (req: Request, res: Response) => {
  const result = await serviceRequestService.updateStatus(
    req.params.id as string,
    req.body.status,
  );
  res
    .status(201)
    .send({ success: true, message: "Status updated", data: result });
};

export const serviceRequestController = {
  createRequest,
  getAllRequests,
  deleteRequest,
  updateStatus,
};
