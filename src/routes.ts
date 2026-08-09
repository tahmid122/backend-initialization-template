const router = Router();
import { Router } from "express";
import { authenticationRoutes } from "./modules/authentication/authentication.routes";
import { blogRoutes } from "./modules/blog/blog.routes";
import { promotionRoutes } from "./modules/promotion/promotion.routes";

//authentication
router.use("/auth", authenticationRoutes);
// blogs
router.use("/blogs", blogRoutes);
//promotions
router.use("/promotions", promotionRoutes);

export default router;
