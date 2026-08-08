const router = Router();
import { Router } from "express";
import { authenticationRoutes } from "./modules/authentication/authentication.routes";

//authentication
router.use("/auth", authenticationRoutes);

export default router;
