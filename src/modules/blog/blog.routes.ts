import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { blogController } from "./blog.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../prisma/generated/prisma/enums";

const router = Router();

//create blog
router.post("/", auth(UserRole.ADMIN), asyncHandler(blogController.createBlog));
//create blog
router.patch(
  "/:blogId",
  auth(UserRole.ADMIN),
  asyncHandler(blogController.updateBlog),
);
//get all blogs
router.get("/", asyncHandler(blogController.getAllBlogs));

export const blogRoutes = router;
