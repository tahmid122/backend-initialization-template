const router = Router();
import { Router } from "express";
import { authenticationRoutes } from "./modules/authentication/authentication.routes";
import { blogRoutes } from "./modules/blog/blog.routes";
import { promotionRoutes } from "./modules/promotion/promotion.routes";
import { supportRoutes } from "./modules/support/support.routes";
import { packageRoutes } from "./modules/package/package.routes";
import { serviceRequestsRoutes } from "./modules/serviceRequests/serviceRequests.routes";
import { userRoutes } from "./modules/user/user.routes";
//authentication
router.use("/auth", authenticationRoutes);
// blogs
router.use("/blogs", blogRoutes);
//promotions
router.use("/promotions", promotionRoutes);
//support
router.use("/support", supportRoutes);
//package
router.use("/packages", packageRoutes);
//service requests
router.use("/service-requests", serviceRequestsRoutes);
//users management
router.use("/users", userRoutes);
export default router;
