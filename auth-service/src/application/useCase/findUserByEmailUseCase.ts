import { IDependencies } from "../interface/IDependencies";
import { userSchemaEntity } from "../../domain/entities";

export const findUserByEmailUseCase = (dependencies: IDependencies) => {
    const { repositories:{findByEmail} } = dependencies;

    return {
        execute: async (email: string): Promise<userSchemaEntity | null> => {
           
                return await findByEmail(email);
                
           
        }
    };
};
