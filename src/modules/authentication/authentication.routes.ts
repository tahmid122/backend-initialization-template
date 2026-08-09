import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { authenticationController } from "./authentication.controller";

const router = Router();

// REGISTRATION
router.post("/register", asyncHandler(authenticationController.register));
//verify-account
router.post(
  "/verify-account",
  asyncHandler(authenticationController.verifyAccount),
);
//resend-verification-email
router.post(
  "/resend-verification-email",
  asyncHandler(authenticationController.resendVerificationEmail),
);

//LOGIN

//login
router.post("/login", asyncHandler(authenticationController.login));
//forgot password
router.post(
  "/forgot-password",
  asyncHandler(authenticationController.forgotPassword),
);
//verify forgot password
router.post(
  "/verify-forgot-password",
  asyncHandler(authenticationController.verifyForgotPassword),
);
//set new password
router.post(
  "/set-new-password",
  asyncHandler(authenticationController.setNewPassword),
);

export const authenticationRoutes: Router = router;
