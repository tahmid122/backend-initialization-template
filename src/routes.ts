const router = Router();
import { Router } from "express";
import { authenticationRoutes } from "./modules/authentication/authentication.routes";
import { blogRoutes } from "./modules/blog/blog.routes";

//authentication
router.use("/auth", authenticationRoutes);
// blogs
router.use("/blogs", blogRoutes);

export default router;
