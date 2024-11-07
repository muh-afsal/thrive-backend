import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interface/IDependencies";
import { generateOtpUseCase, saveOtpUseCase } from "../../application/useCase";
import { publishToQueue } from "../../infrastructure/rabbitMQ/publisher";
import { findUserByEmailUseCase } from "../../application/useCase";

export const resendOtpController = (dependencies: IDependencies) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email } = req.body;


      const otp = generateOtpUseCase();
      console.log(otp, "----- new OTP generated ----");
      await saveOtpUseCase(dependencies).execute(email, otp);

      const otpdata = {
        email: email,
        otp: otp,
      };

      await publishToQueue("sendOtpQueue", otpdata);

      res.status(200).json({ success: true, message: "A new OTP has been sent to your email." });
    } catch (error) {
      next(error);
    }
  };
};
