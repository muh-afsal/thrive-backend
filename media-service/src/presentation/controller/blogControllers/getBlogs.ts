import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";

export const fetchAllBlogsController = (dependencies: IDependencies) => {
  const {
    useCases: { fetchAllBlogUseCase }, 
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
     
      const blogs = await fetchAllBlogUseCase(dependencies).execute(); 
      
      res.status(200).json({
        success: true,
        message: "blogs fetched successfully",
        blogs, 
      });
    } catch (error: any) {
      console.error("Error fetching chats:", error);
      res.status(400).json({ message: "Server error", error: error.message });
    }
  };
};
