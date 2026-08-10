const router = Router();
import { Router } from "express";
import { authenticationRoutes } from "./modules/authentication/authentication.routes";
import { blogRoutes } from "./modules/blog/blog.routes";
import { promotionRoutes } from "./modules/promotion/promotion.routes";
import { supportRoutes } from "./modules/support/support.routes";

//authentication
router.use("/auth", authenticationRoutes);
// blogs
router.use("/blogs", blogRoutes);
//promotions
router.use("/promotions", promotionRoutes);
//support
router.use("/support", supportRoutes);
export default router;
