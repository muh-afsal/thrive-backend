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
exports.removeBlogController = void 0;
const blogSchema_1 = require("../../../infrastructure/database/mongodb/models/blogSchema");
const removeBlogController = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { blogId } = req.params;
            console.log(blogId, 'this is the bloh isssssssssssssssssssssss');
            const deletedBlog = yield blogSchema_1.Blog.findByIdAndDelete(blogId);
            return res.status(200).json({
                success: true,
                message: "Blog deleted successfully",
                blog: deletedBlog,
            });
        }
        catch (error) {
            console.error("Error deleting blog:", error);
            res.status(500).json({ message: "Server error", error: error.message });
        }
    });
};
exports.removeBlogController = removeBlogController;
