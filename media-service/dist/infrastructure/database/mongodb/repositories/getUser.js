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
exports.searchUsers = void 0;
const UserSchema_1 = require("../models/UserSchema");
const searchUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserSchema_1.User.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        }).exec();
        return users;
    }
    catch (error) {
        console.error('Error fetching users:', error.message);
        throw new Error(error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.searchUsers = searchUsers;
