import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interface/IDependencies";
import { findUserByEmailUseCase } from "../../application/useCase";

export const checkEmailController = (dependencies: IDependencies) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { email } = req.body;

      const user = await findUserByEmailUseCase(dependencies).execute(email);

      if (!user) {
        return res.status(200).json({
          success: false,
          message: "Couldn't find an account with this email. Please provide an email associated with an account on Thrive.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Email is valid and associated with an account.",
      });
    } catch (error) {
      next(error);
    }
  };
};
