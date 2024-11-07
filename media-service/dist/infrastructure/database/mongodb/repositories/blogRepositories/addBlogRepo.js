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
exports.addBlogRepo = void 0;
const blogSchema_1 = require("../../models/blogSchema");
const addBlogRepo = (blogData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBlog = new blogSchema_1.Blog(blogData);
        const savedBlog = yield newBlog.save();
        return savedBlog;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.addBlogRepo = addBlogRepo;
