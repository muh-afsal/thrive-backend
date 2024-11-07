import { Request, Response, NextFunction } from "express";
import { Blog } from "../../../infrastructure/database/mongodb/models/blogSchema";

export const fetchBlogsByAuthorController = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
       

      const blogs = await Blog.find({ author: userId })
        .populate({
          path: "author",
          select: "firstname lastname email profileImage",
        })
        .exec();

      if (!blogs || blogs.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No blogs found for the specified author.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Blogs fetched successfully",
        blogs,
      });
    } catch (error: any) {
      console.error("Error fetching blogs by author:", error);
      res.status(500).json({
        success: false,
        message: "Unable to retrieve blogs at this time. Please try again later.",
        error: error.message,
      });
    }
  };
};
