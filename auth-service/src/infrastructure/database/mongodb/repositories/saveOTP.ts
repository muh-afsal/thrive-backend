import { OTPModel } from "../models/OTPschema";

export const saveOTP = async (email: string, otp: string): Promise<void> => {
  const otpDocument = new OTPModel({
    email,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60000) 
  });
  await otpDocument.save();
};
