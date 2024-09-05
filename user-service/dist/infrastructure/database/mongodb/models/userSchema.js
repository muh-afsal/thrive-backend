"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    isBlocked: { type: Boolean, default: false },
    phone: { type: String },
    bio: { type: String },
    address: { type: String },
    profession: { type: String },
    profileImage: { type: String },
    subscription: [
        {
            paymentStatus: { type: String, enum: ["pending", "paid"] },
            expiration: { type: Date },
            planType: { type: String },
            isActive: { type: Boolean, default: true },
        }
    ],
    transactions: [
        {
            transactionType: { type: String, enum: ["credit", "debit"] },
            message: { type: String },
            date: { type: Date },
            amount: { type: Number },
            transactionID: { type: String },
        }
    ],
}, {
    timestamps: true,
});
exports.User = mongoose_2.default.model("User", UserSchema);
