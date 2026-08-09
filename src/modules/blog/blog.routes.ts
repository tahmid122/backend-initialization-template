import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { blogController } from "./blog.controller";

const router = Router();

//create blog
router.post("/", asyncHandler(blogController.createBlog));

export const blogRoutes = router;
