import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { authenticationController } from "./authentication.controller";

const router = Router();

//register
router.post("/register", asyncHandler(authenticationController.register));

export const authenticationRoutes: Router = router;
