import { Schema } from "mongoose";
import mongoose from "mongoose";
import { userSchemaEntity } from "../../../../domain/entities/userSchemaEntity";

const UserSchema: Schema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    isBlocked: { type: Boolean, default: false },
    phone: { type: String },
    bio: { type: String}, 
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
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<userSchemaEntity>("User", UserSchema);
