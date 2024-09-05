import { Schema } from "mongoose";
import mongoose from "mongoose";
import { authSignUpEntity } from "../../../../domain/entities/authSignupEntity";

const UserSchema: Schema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isAdmin: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    otp: { type: String },
    otpExpiresAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<authSignUpEntity>("User", UserSchema);
   