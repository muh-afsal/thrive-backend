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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUserToDatabase = void 0;
const UserSchema_1 = require("../models/UserSchema");
const saveUserToDatabase = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, _id } = userData, rest = __rest(userData, ["email", "_id"]);
        const existingUser = yield UserSchema_1.User.findOne({ email });
        if (existingUser) {
            yield UserSchema_1.User.updateOne({ email }, { $set: rest });
            console.log(`User with email ${email} updated successfully.`);
        }
        else {
            const newUser = new UserSchema_1.User(userData);
            yield newUser.save();
            console.log(`User with email ${email} saved successfully.`);
        }
    }
    catch (error) {
        console.error('Error saving user to database:', error);
        throw error;
    }
});
exports.saveUserToDatabase = saveUserToDatabase;
