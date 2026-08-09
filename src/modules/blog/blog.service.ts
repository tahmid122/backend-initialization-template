import { Blog, BlogStatus } from "../../../prisma/generated/prisma/client";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/AppError";

//interfaces
interface BlogPayload {
  title?: string;
  content?: string;
  thumbnail?: string;
  status?: BlogStatus;
}

//create blog
const createBlog = async (
  data: Pick<Blog, "title" | "content" | "thumbnail">,
) => {
  const { title, content, thumbnail } = data;
  const createdBlog = await prisma.blog.create({
    data: {
      title,
      content,
      thumbnail,
    },
  });
  return {
    success: true,
    message: "Blog created successfully",
    data: createdBlog,
  };
};
//update blog
const updateBlog = async (id: string, payload: BlogPayload) => {
  const { thumbnail, title, content, status } = payload;
  const blog_status = Object.keys(BlogStatus);
  const updateData: BlogPayload = {};

  if (title !== undefined) updateData.title = title;
  if (content !== undefined) updateData.content = content;
  if (thumbnail !== undefined) updateData.thumbnail = thumbnail;
  if (status && !blog_status.includes(status)) {
    throw new AppError(
      `Invalid status. Status must be ${blog_status.join(" | ")}`,
    );
  }
  if (status !== undefined) updateData.status = status;

  if (Object.keys(updateData).length === 0) {
    throw new AppError("At least one field required for update blog.");
  }

  const updatedBlog = await prisma.blog.update({
    where: { id: id },
    data: updateData,
  });

  return {
    success: true,
    message: "Blog updated successfully",
    data: updatedBlog,
  };
};

export const blogService = { createBlog, updateBlog };
