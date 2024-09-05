import { IDependencies } from "../interface/IDependencies";
import { userSchemaEntity } from "../../domain/entities";

export const completeProfileUseCase = (dependencies: IDependencies) => {
    const { repositories: { completeProfile } } = dependencies;

    return {
        execute: async (data: userSchemaEntity) => {
            try {
                return await completeProfile(data);
            } catch (error: any) {
                throw new Error(error?.message);
            }
        }
    };
};
