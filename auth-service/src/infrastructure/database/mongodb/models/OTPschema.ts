import mongoose, { Schema } from "mongoose";
import { OTPEntity } from "../../../../domain/entities/OTPEntity";

const OTPSchema: Schema = new Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { 
        type: Date, 
        required: true, 
        default: () => new Date(Date.now() + 10 * 60000), 
        index: { expires: '10m' } 
    } 
});

export const OTPModel = mongoose.model<OTPEntity>('OTP', OTPSchema);