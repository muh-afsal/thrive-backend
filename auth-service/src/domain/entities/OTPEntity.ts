
import { ObjectId } from "mongoose";


 export interface OTPEntity {
    _id: ObjectId ;
    email: string;
    otp: string;
    expiresAt: Date;
}