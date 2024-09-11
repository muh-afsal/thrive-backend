import { OTPModel } from "../models/OTPschema";

export const saveOTP = async (email: string, otp: string): Promise<void> => {
  const otpDocument = await OTPModel.findOne({ email });

  if (otpDocument) {
    otpDocument.otp = otp;
    otpDocument.expiresAt = new Date(Date.now() + 2 * 60000);
    await otpDocument.save();
    console.log(`OTP updated for ${email}`);
  } else {
    const newOtpDocument = new OTPModel({
      email,
      otp,
      expiresAt: new Date(Date.now() + 2 * 60000) 
    });
    await newOtpDocument.save();
    console.log(`New OTP created for ${email}`);
  }
};
