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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordController = void 0;
const userSchema_1 = require("../../infrastructure/database/mongodb/models/userSchema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const changePasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and new password are required' });
        }
        const user = yield userSchema_1.User.findOne({ email }).exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        user.password = hashedPassword;
        yield user.save();
        res.status(200).json({ message: 'Password updated successfully' });
    }
    catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.changePasswordController = changePasswordController;
