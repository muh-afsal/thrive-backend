import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interface/IDependencies";
import { OAuth2Client } from "google-auth-library"; 
import { GOOGLE_CLIENT_ID } from "../../config/envConfig/config";
import { hashPassword } from "../../utils/bcrypt/hashpassword";
import { generateAccessToken } from "../../utils/jwt/generateAccessToken";
import { generateRefreshToken } from "../../utils/jwt/generateRefreshToken";
import { Role } from "../../domain/entities/userSchemaEntity";
import { publishToQueue } from "../../infrastructure/rabbitMQ/publisher";

export const googleAuthController = (dependencies: IDependencies) => {
  const {
    useCases: { signupUserUseCase, findUserByEmailUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { credential } = req.body;
      const client = new OAuth2Client(GOOGLE_CLIENT_ID);


      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: GOOGLE_CLIENT_ID, 
      });

      const payload = ticket.getPayload();
      if (!payload || !payload.email) {
        return res.status(400).json({ success: false, error: "Invalid token" });
      }

      const { email, given_name, family_name } = payload;

     
      let user = await findUserByEmailUseCase(dependencies).execute(email);
      
      if (!user) {
        
        const randomPassword = Math.random().toString(36).slice(-8); 
        const hashedPassword = await hashPassword(randomPassword);

        user = await signupUserUseCase(dependencies).execute({
          firstname: given_name || "",
          lastname: family_name || "",
          email,
          password: hashedPassword,
          phone: "0000000000", 
          role: Role.user,
          isAdmin: false,
          isBlocked: false,
        });

        

        if (user) {
          await publishToQueue("userDataQueue", user);
        } else {
          return res.status(500).json({ success: false, message: "User creation failed" });
        }
      }

      // Generate tokens (access and refresh)
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
      

      return res.status(200).json({ 
        success: true, 
        data: user, 
        message: "Login successful", 
        accessToken, 
        refreshToken 
      });
    } catch (error) {
      next(error);
    }
  };
};
