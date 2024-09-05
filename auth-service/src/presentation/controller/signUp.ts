import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interface/IDependencies";
import { verifyOtpUseCase, saveOtpUseCase, generateOtpUseCase } from "../../application/useCase";
import { hashPassword } from "../../utils/bcrypt/hashpassword";
import { sendOTP } from "../../utils/otp/sendOTP";
import { Role } from "../../domain/entities/authSignupEntity";
import { publishCreatedUser } from "../../infrastructure/rabbitMQ/publisher";
import { generateAccessToken } from "../../utils/jwt/generateAccessToken";
import { generateRefreshToken } from "../../utils/jwt/generateRefreshToken";

export const signupController = (dependencies: IDependencies) => {
  const {
    useCases: { signupUserUseCase, findUserByEmailUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => { 
    try {
      const { firstname, lastname, email, password, phone, otp } = req.body;

      if (otp) {
        // OTP Verification Logic
        const isValid = await verifyOtpUseCase(dependencies).execute(email, otp);
        if (!isValid) {
          res.status(400).json({ success: false, message: "Invalid or expired OTP" });
          return;
        }

        const hashedPassword = await hashPassword(password);
        const user = await signupUserUseCase(dependencies).execute({
          firstname,
          lastname,
          email,
          password: hashedPassword,
          phone,
          role: Role.user,
          isAdmin: false,
          isBlocked: false,
        });

        if (user) {
          const userId = user._id?.toString() ?? "";



          const accessToken = generateAccessToken({
            userId,
            userEmail: user.email,
            tokenType:'accessToken',
            role: user.role?.toString() ?? Role.user.toString(),
            isAdmin: user.isAdmin ?? false,
            isBlocked: user.isBlocked ?? false,
          });

          const refreshToken = generateRefreshToken({
            userId,
            userEmail: user.email,
            tokenType:'refreshToken',
            role: user.role?.toString() ?? Role.user.toString(),
            isAdmin: user.isAdmin ?? false,
            isBlocked: user.isBlocked ?? false,
          });

          // console.log(accessToken,refreshToken,'7777777777777777777777777');
          
          
          res.cookie("accessToken", accessToken, {
            maxAge: 1000 * 60 * 60 * 24, 
            // httpOnly: true,
            secure:true,
            sameSite: 'none'
          });
          
          res.cookie("refreshToken", refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 7, 
            // httpOnly: true,
            secure:true,
            sameSite: 'none'
          });
          
          console.log('thsi is token',refreshToken);
          await publishCreatedUser("userDataQueue", user);

          res.status(201).json({ success: true, data: user, message: "User created" });
        } else {
          res.status(500).json({ success: false, message: "User creation failed. Please try again." });
        }
      } else {
        // Signup Logic
        const existingUser = await findUserByEmailUseCase(dependencies).execute(email);
        if (existingUser) {
          res.status(400).json({ success: false, message: "Email already exists" });
          return;
        }

        // Generate and save OTP
        const otp = generateOtpUseCase();
        console.log(otp,'----- generated otp ----')
        await saveOtpUseCase(dependencies).execute(email, otp);

        // Send OTP to user
        await sendOTP(email, otp);

        res.status(200).json({ success: true, message: "OTP sent to your email. Please verify to complete signup." });
      }
    } catch (error) {
      next(error);
    }
  };
};
