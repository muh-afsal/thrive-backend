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
exports.fetchBlogByIdController = void 0;
const blogSchema_1 = require("../../../infrastructure/database/mongodb/models/blogSchema");
const fetchBlogByIdController = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { blogId } = req.params;
            const blog = yield blogSchema_1.Blog.findById(blogId)
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
        }
        catch (error) {
            console.error("Error fetching blog by ID:", error);
            res.status(500).json({
                success: false,
                message: "Unable to retrieve the blog at this time. Please try again later.",
                error: error.message,
            });
        }
    });
};
exports.fetchBlogByIdController = fetchBlogByIdController;
