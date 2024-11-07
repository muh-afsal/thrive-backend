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

      const { blogId, heading, content, attachment, attachmentType, thumbnail, author, comment, like } = req.body;

      if (blogId) {
        const updateData: {
          heading?: string;
          content?: string;
          attachment?: string;
          attachmentType?: string;
          thumbnail?: string;
          $push?: { comments: { commentor: Types.ObjectId; comment: string; commentedOn: Date } };
          $addToSet?: { likes: Types.ObjectId };
          $pull?: { likes: Types.ObjectId };
        } = { heading, content, attachment, attachmentType, thumbnail };

        if (comment) {
          updateData.$push = { comments: { commentor: author, comment, commentedOn: new Date() } };
        }

        if (like) {
          const blog = await Blog.findById(blogId);
          
          if (blog) {
            if (blog.likes && blog.likes.includes(author)) { 
              updateData.$pull = { likes: author };
            } else {
              updateData.$addToSet = { likes: author };
            }
          } else {
            return res.status(404).json({
              success: false,
              message: "Blog not found",
            });
          }
        }

        const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateData, { new: true });

        return res.status(200).json({
          success: true,
          message: "Blog updated successfully",
          blog: updatedBlog,
        });
      }

      const blogData = new Blog({
        heading,
        content,
        attachment,
        attachmentType,
        thumbnail,
        author,
        isBlocked: false,
        comments: []
      });

      const newBlog = await addBlogUseCase(dependencies).execute(blogData);

      res.status(200).json({
        success: true,
        message: "New blog added successfully",
        blog: newBlog,
      });
    } catch (error: any) {
      console.error("Error adding/updating blog:", error);
      res.status(400).json({ message: "Server error", error: error.message });
    }
  };
};
