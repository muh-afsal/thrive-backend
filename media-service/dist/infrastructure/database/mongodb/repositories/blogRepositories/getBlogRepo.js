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
exports.fetchAllBlogs = void 0;
const blogSchema_1 = require("../../models/blogSchema");
const fetchAllBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBlogs = yield blogSchema_1.Blog.find()
            .populate({
            path: 'author',
            select: 'firstname lastname email profileImage'
        })
            .exec();
        return allBlogs;
    }
    catch (error) {
        console.error('Error fetching blogs:', error.message);
        throw new Error(error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.fetchAllBlogs = fetchAllBlogs;
