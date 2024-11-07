import { NextFunction, Response, Request } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import { Blog } from "../../../infrastructure/database/mongodb/models/blogSchema";

export const removeBlogController = () => {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { blogId } = req.params;
      console.log(blogId,'this is the bloh isssssssssssssssssssssss');
      

      const deletedBlog = await Blog.findByIdAndDelete(blogId);


      return res.status(200).json({
        success: true,
        message: "Blog deleted successfully",
        blog: deletedBlog,
      });
    } catch (error: any) {
      console.error("Error deleting blog:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
};
