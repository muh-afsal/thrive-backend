import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IDependencies } from "../../application/interface/IDependencies";
import { userSchemaEntity } from "../../domain/entities";
import { hashPassword } from "../../utils/bcrypt/hashpassword";

export const completeProfileController = (dependencies: IDependencies) => {
  const {
    useCases: { completeProfileUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<userSchemaEntity | void> => {
    try {
      const { accessToken } = req.cookies;
      const userData = req.body;

      console.log(userData, "this is the new data of user ____________");

      if (!accessToken) {
        res.status(400).json({ message: "Access token is missing." });
        return;
      }

      const decodedAccessToken = jwt.decode(accessToken);
      const { userId } = decodedAccessToken as JwtPayload;
      const _id = userId;

      if (userData.password) {
        userData.password = await hashPassword(userData.password);
      }

      const completeData = { ...userData, _id };

      const updatedUser = await completeProfileUseCase(dependencies).execute(completeData);

      res.status(200).json({
        message: "Profile completed successfully!",
        _id,
      });
    } catch (error) {
      console.error("Error in completeProfileController:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };
};
