// import {OTPModel} from "../models/OTPschema"




// export const otpRepository = {
//     async saveOTP(email: string, otp: string): Promise<void> {
//         const otpDocument = new OTPModel({
//             email,
//             otp,
//             expiresAt: new Date(Date.now() + 5 * 60000) // 5 minutes from now
//         });
//         await otpDocument.save();
//     },
//     async verifyOTP(email: string, submittedOTP: string): Promise<boolean> {
//         const otpRecord = await OTPModel.findOne({ email, otp: submittedOTP });
//         if (otpRecord) {
//             await OTPModel.deleteOne({ _id: otpRecord._id }); // delete OTP after verification
//             return true;
//         }
//         return false;
//     }
// };
