import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interface/IDependencies";
import { generateAccessToken } from "../../utils/jwt/generateAccessToken";
import { generateRefreshToken } from "../../utils/jwt/generateRefreshToken";
import { userSchemaEntity } from "../../domain/entities";

export const loginController = (dependencies: IDependencies) => {
    const { useCases: { loginUserUseCase } } = dependencies;

    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ success: false, message: "Email and password are required" });
                return;
            }

            const user: userSchemaEntity | null = await loginUserUseCase(dependencies).execute({ email, password });

            console.log(user,'thisis the response of login');
            

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
          


                res.status(200).json({ success: true, data: user, message: "Login successful", accessToken, refreshToken });
            } else {
                res.status(401).json({ success: false, message: "Invalid email or password" });
            }
        } catch (error) {
            next(error);
        }
    };
};
