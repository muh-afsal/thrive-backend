import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interface/IDependencies";
import { generateAccessToken } from "../../utils/jwt/generateAccessToken";
import { generateRefreshToken } from "../../utils/jwt/generateRefreshToken";
import { authSignUpEntity } from "../../domain/entities";

export const loginController = (dependencies: IDependencies) => {
    const { useCases: { loginUserUseCase } } = dependencies;

    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ success: false, message: "Email and password are required" });
                return;
            }

            const user: authSignUpEntity | null = await loginUserUseCase(dependencies).execute({ email, password });

            if (user) {
                const userId = user._id?.toString() ?? "";



          const accessToken = generateAccessToken({
            userId,
            userEmail: user.email,
            tokenType:'accessToken',
            role: user.role?.toString(),
            isAdmin: user.isAdmin ?? false,
            isBlocked: user.isBlocked ?? false,
          });

          const refreshToken = generateRefreshToken({
            userId,
            userEmail: user.email,
            tokenType:'refreshToken',
            role: user.role?.toString() ,
            isAdmin: user.isAdmin ?? false,
            isBlocked: user.isBlocked ?? false,
          });

          console.log(accessToken,refreshToken,'7777777777777777777777777');
          
          
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


                res.status(200).json({ success: true, data: user, message: "Login successful", accessToken, refreshToken });
            } else {
                res.status(401).json({ success: false, message: "Invalid email or password" });
            }
        } catch (error) {
            next(error);
        }
    };
};
