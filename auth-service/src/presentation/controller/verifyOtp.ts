import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interface/IDependencies";
import { verifyOtpUseCase } from "../../application/useCase";

export const verifyOtpController = (dependencies: IDependencies) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, otp } = req.body;
      console.log(email, otp);
      

      if (!email || !otp) {
        res.status(200).json({ success: false, message: "Email and OTP are required" });
        return;
      }

      const isValid = await verifyOtpUseCase(dependencies).execute(email, otp);

      console.log(isValid,'otp verication success full-------------------');
      

      if (!isValid) {
        res.status(200).json({ success: false, message: "Invalid or expired OTP" });
        return;
      }

      res.status(200).json({ success: true, message: "OTP verified successfully." });
    } catch (error) {
      next(error);
    }
  };
};
