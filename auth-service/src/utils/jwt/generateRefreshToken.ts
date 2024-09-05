import jwt from "jsonwebtoken";
import { AUTH_JWT_SECRET } from "../../config/envConfig/config";

export const generateRefreshToken = (payload: {
  userId: string;
  userEmail: string;
  tokenType:string; 
  role: unknown;
  isAdmin: any;
  isBlocked: any;
}) => {
  return jwt.sign(payload, String(AUTH_JWT_SECRET), {
    expiresIn: "7d",
  });
};
