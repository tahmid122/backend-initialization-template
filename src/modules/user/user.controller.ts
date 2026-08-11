import { Request, Response } from "express";
import { userService } from "./user.service";

const updateUserStatus = async (req: Request, res: Response) => {
  const result = await userService.updateUserStatus(req.params.id as string);

  res
    .status(301)
    .send({ success: true, message: "User status Updated.", data: result });
};

export const userController = { updateUserStatus };
