import { Request, Response } from "express";
import { authenticationService } from "./authentication.service";
import { JWT_USER } from "../../middlewares/auth";

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
  const result = await authenticationService.login(req.body);
  res.cookie("accessToken", result.data.token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 3600000 * 24,
  });
  res.status(200).send(result);
};

const forgotPassword = async (req: Request, res: Response) => {
  const result = await authenticationService.forgotPassword(req.body);
  res.status(200).send(result);
};

const verifyForgotPassword = async (req: Request, res: Response) => {
  const result = await authenticationService.verifyForgotPassword(req.body);
  res.status(200).send(result);
};

const setNewPassword = async (req: Request, res: Response) => {
  const result = await authenticationService.setNewPassword(req.body);
  res.status(201).send(result);
};

const changePassword = async (req: Request, res: Response) => {
  const result = await authenticationService.changePassword(
    req.body,
    req.user as JWT_USER,
  );
};

export const authenticationController = {
  register,
  verifyAccount,
  resendVerificationEmail,
  login,
  forgotPassword,
  verifyForgotPassword,
  setNewPassword,
  changePassword,
};
