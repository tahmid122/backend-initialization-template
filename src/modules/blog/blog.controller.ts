import { Request, Response } from "express";
import { blogService } from "./blog.service";

//create blog
const createBlog = async (req: Request, res: Response) => {
  const result = await blogService.createBlog(req.body);
  res.status(201).send(result);
};
const updateBlog = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const result = await blogService.updateBlog(blogId as string, req.body);
  res.status(201).send(result);
};

const getAllBlogs = async (req: Request, res: Response) => {
  const result = await blogService.getAllBlogs(req.query);
  res.status(200).send(result);
};
const getSingleBlog = async (req: Request, res: Response) => {
  const result = await blogService.getSingleBlog(req.params.blogId as string);
  res.status(200).send(result);
};
const deleteBlog = async (req: Request, res: Response) => {
  const result = await blogService.deleteBlog(req.params.blogId as string);
  res.status(200).send(result);
};

export const blogController = {
  createBlog,
  updateBlog,
  getAllBlogs,
  getSingleBlog,
  deleteBlog,
};
