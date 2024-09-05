import { IDependencies } from "../interface/IDependencies";
import { authSignUpEntity } from "../../domain/entities";

export const findUserByEmailUseCase = (dependencies: IDependencies) => {
    const { repositories:{findByEmail} } = dependencies;

    return {
        execute: async (email: string): Promise<authSignUpEntity | null> => {
           
                return await findByEmail(email);
                
           
        }
    };
};
