import { NextFunction, Request, Response } from "express";
import { searchUsers } from "../../../infrastructure/database/mongodb/repositories";
import { IDependencies } from "../../../application/interface/IDependencies";

export const searchUsersController = (dependencies: IDependencies) => {
  const {useCases: { searchUserUseCase }} = dependencies;
    return async(req: Request, res: Response, next: NextFunction) => {
      try{
        const { query } = req.query;
   
        const users = await searchUserUseCase(dependencies).execute(query as string);

            res.status(200).json({ users });

      }catch(error){
        console.error(error,"error in seraching user")
        res.status(500).json({ message: "Server error", error: error });
        
      }
    }
};
