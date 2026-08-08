import { Request, Response } from "express";
import { authenticationService } from "./authentication.service";

const register = async (req: Request, res: Response) => {
  await authenticationService.register(req.body);

  return res.status(201).send({
    success: true,
    message:
      "User registration successful. Verification email sent to your email.",
  });
};

export const authenticationController = { register };
