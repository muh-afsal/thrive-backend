"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBlogController = void 0;
const blogSchema_1 = require("../../../infrastructure/database/mongodb/models/blogSchema");
const addBlogController = (dependencies) => {
    const { useCases: { addBlogUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { blogId, heading, content, attachment, attachmentType, thumbnail, author, comment, like } = req.body;
            if (blogId) {
                const updateData = { heading, content, attachment, attachmentType, thumbnail };
                if (comment) {
                    updateData.$push = { comments: { commentor: author, comment, commentedOn: new Date() } };
                }
                if (like) {
                    const blog = yield blogSchema_1.Blog.findById(blogId);
                    if (blog) {
                        if (blog.likes && blog.likes.includes(author)) {
                            updateData.$pull = { likes: author };
                        }
                        else {
                            updateData.$addToSet = { likes: author };
                        }
                    }
                    else {
                        return res.status(404).json({
                            success: false,
                            message: "Blog not found",
                        });
                    }
                }
                const updatedBlog = yield blogSchema_1.Blog.findByIdAndUpdate(blogId, updateData, { new: true });
                return res.status(200).json({
                    success: true,
                    message: "Blog updated successfully",
                    blog: updatedBlog,
                });
            }
            const blogData = new blogSchema_1.Blog({
                heading,
                content,
                attachment,
                attachmentType,
                thumbnail,
                author,
                isBlocked: false,
                comments: []
            });
            const newBlog = yield addBlogUseCase(dependencies).execute(blogData);
            res.status(200).json({
                success: true,
                message: "New blog added successfully",
                blog: newBlog,
            });
        }
        catch (error) {
            console.error("Error adding/updating blog:", error);
            res.status(400).json({ message: "Server error", error: error.message });
        }
    });
};
exports.addBlogController = addBlogController;
