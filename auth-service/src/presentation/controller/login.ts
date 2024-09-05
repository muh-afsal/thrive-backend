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
                const userId: string = user._id?.toString() ?? "";

                // Generate access and refresh tokens
                const accessToken = generateAccessToken({
                    userId,
                    userEmail: user.email,
                    role: user.role?.toString() ?? "",
                    isAdmin: user.isAdmin ?? false,
                    isBlocked: user.isBlocked ?? false,
                });

                const refreshToken = generateRefreshToken({
                    userId,
                    userEmail: user.email,
                    role: user.role?.toString() ?? "",
                    isAdmin: user.isAdmin ?? false,
                    isBlocked: user.isBlocked ?? false,
                });

                // Set cookies for tokens
                res.cookie("accessToken", accessToken, {
                    maxAge: 1000 * 60 * 60 * 24,
                    httpOnly: true,
                });

                res.cookie("refreshToken", refreshToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    httpOnly: true,
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
