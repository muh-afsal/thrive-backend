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
exports.saveUserToDatabase = void 0;
const userSchema_1 = require("../../mongodb/models/userSchema");
const saveUserToDatabase = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new userSchema_1.User(userData);
        yield newUser.save();
        console.log('User saved to database successfully');
        return newUser;
    }
    catch (error) {
        console.error('Error saving user to database:', error.message);
        throw new Error(error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.saveUserToDatabase = saveUserToDatabase;
