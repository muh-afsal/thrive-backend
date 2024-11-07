import { BlogEntity } from "../../../../../domain/entities";
import { Blog } from "../../models/blogSchema";

export const addBlogRepo = async (blogData: BlogEntity) => {
  try {
    const newBlog = new Blog(blogData);

    const savedBlog = await newBlog.save();

    return savedBlog;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
