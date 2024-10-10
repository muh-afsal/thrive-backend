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
exports.getUserById = void 0;
const userSchema_1 = require("../models/userSchema");
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userSchema_1.User.findById(id).exec();
        if (user) {
            return user;
        }
        return null;
    }
    catch (error) {
        console.error('Error updating user profile:', error.message);
        throw new Error(error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.getUserById = getUserById;
