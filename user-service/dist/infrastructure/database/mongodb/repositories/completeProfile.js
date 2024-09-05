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
exports.completeProfile = void 0;
const userSchema_1 = require("../../mongodb/models/userSchema");
const completeProfile = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(userData.profileImage, 'user data from repo RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');
        const updatedUser = yield userSchema_1.User.findByIdAndUpdate(userData._id, {
            $set: {
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: userData.email,
                password: userData.password,
                // subscription: userData.subscription,
                // transactions: userData.transactions,
                address: userData.address,
                bio: userData.bio,
                phone: userData.phone,
                profession: userData.profession,
                profileImage: userData.profileImage,
            },
        }, { new: true });
        console.log(updatedUser, 'updated dataaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        if (!updatedUser) {
            throw new Error('User not found');
        }
        return updatedUser;
    }
    catch (error) {
        console.error('Error updating user profile:', error.message);
        throw new Error(error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.completeProfile = completeProfile;
