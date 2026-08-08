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

const verifyAccount = async (req: Request, res: Response) => {
  await authenticationService.verifyAccount(req.body);

  return res.status(200).send({ success: true, message: "Account verified." });
};

const resendVerificationEmail = async (req: Request, res: Response) => {
  await authenticationService.resendVerificationEmail(req.body);
  return res
    .status(200)
    .send({ success: true, message: "Resend verification email sent" });
};

const login = async (req: Request, res: Response) => {
  await authenticationService.login(req.body);
};
export const authenticationController = {
  register,
  verifyAccount,
  resendVerificationEmail,
  login,
};
