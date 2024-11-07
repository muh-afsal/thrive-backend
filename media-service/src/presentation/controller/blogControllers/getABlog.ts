import { Request, Response, NextFunction } from "express";
import { Blog } from "../../../infrastructure/database/mongodb/models/blogSchema";

export const fetchBlogByIdController = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { blogId } = req.params;

      const blog = await Blog.findById(blogId)
        .populate({
          path: "author",
          select: "firstname lastname email profileImage",
        })
        .populate({
          path: 'comments.commentor',
          model: 'User', 
          select: 'firstname lastname profileImage'
        })
        .exec();

      if (!blog) {
        return res.status(404).json({
          success: false,
          message: "Blog not found. It may have been removed or doesn't exist.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Blog fetched successfully",
        blog,
      });
    } catch (error: any) {
      console.error("Error fetching blog by ID:", error);
      res.status(500).json({
        success: false,
        message:
          "Unable to retrieve the blog at this time. Please try again later.",
        error: error.message,
      });
    }
  };
};
