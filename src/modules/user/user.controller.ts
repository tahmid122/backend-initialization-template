import { Request, Response } from "express";
import { userService } from "./user.service";

const updateUserStatus = async (req: Request, res: Response) => {
  const result = await userService.updateUserStatus(req.params.id as string);

  res
    .status(301)
    .send({ success: true, message: "User status Updated.", data: result });
};

const getAllUsers = async (req: Request, res: Response) => {
  const result = await userService.getAllUsers(req.query);

  res
    .status(200)
    .send({ success: true, message: "Users retrieved.", ...result });
};
export const userController = { updateUserStatus, getAllUsers };
