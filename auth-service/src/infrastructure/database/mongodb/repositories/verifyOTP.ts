import { OTPModel } from "../models/OTPschema";

export const verifyOTP = async (email: string, submittedOTP: string): Promise<boolean> => {
  

  
  const otpRecord = await OTPModel.findOne({ email, otp: submittedOTP });
 
  


  if (otpRecord) {
    // await OTPModel.deleteOne({ _id: otpRecord._id });
    return true;
  }
  return false;
};
