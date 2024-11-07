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
exports.fetchBlogsByAuthorController = void 0;
const blogSchema_1 = require("../../../infrastructure/database/mongodb/models/blogSchema");
const fetchBlogsByAuthorController = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            const blogs = yield blogSchema_1.Blog.find({ author: userId })
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
        }
        catch (error) {
            console.error("Error fetching blogs by author:", error);
            res.status(500).json({
                success: false,
                message: "Unable to retrieve blogs at this time. Please try again later.",
                error: error.message,
            });
        }
    });
};
exports.fetchBlogsByAuthorController = fetchBlogsByAuthorController;
