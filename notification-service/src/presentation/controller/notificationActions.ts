import { NextFunction, Response, Request } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import { Blog } from "../../../infrastructure/database/mongodb/models/blogSchema";
import { Types } from 'mongoose';

export const addBlogController = (dependencies: IDependencies) => {
  const {
    useCases: { addBlogUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {

    } catch (error: any) {
      console.error("Error adding/updating blog:", error);
      res.status(400).json({ message: "Server error", error: error.message });
    }
  };
};
