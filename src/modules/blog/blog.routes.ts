import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { blogController } from "./blog.controller";

const router = Router();

//create blog
router.post("/", asyncHandler(blogController.createBlog));
//create blog
router.patch("/:blogId", asyncHandler(blogController.updateBlog));

export const blogRoutes = router;
