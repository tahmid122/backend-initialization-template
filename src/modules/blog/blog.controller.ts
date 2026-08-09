import { Request, Response } from "express";
import { blogService } from "./blog.service";

//create blog
const createBlog = async (req: Request, res: Response) => {
  const result = await blogService.createBlog(req.body);
  res.status(201).send(result);
};

export const blogController = { createBlog };
