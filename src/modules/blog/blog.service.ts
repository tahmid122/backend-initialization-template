import { Blog } from "../../../prisma/generated/prisma/client";
import { prisma } from "../../lib/prisma";

//create blog
const createBlog = async (
  data: Pick<Blog, "title" | "content" | "thumbnail">,
) => {
  const { title, content, thumbnail } = data;
  await prisma.blog.create({
    data: {
      title,
      content,
      thumbnail,
    },
  });
  return { success: true, message: "Blog created successfully" };
};

export const blogService = { createBlog };
