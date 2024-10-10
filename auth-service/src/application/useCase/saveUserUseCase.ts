import { IDependencies } from "../interface/IDependencies";
import { ISaveUserUseCase } from "../../domain/useCaseInterface/ISaveUserUseCase";
import { userSchemaEntity } from "../../domain/entities";

export const saveUserUseCase = (dependencies: IDependencies)=> {
    const {repositories:{saveUserToDatabase}} = dependencies;
    return {
        execute: async (data:userSchemaEntity) => {
            try{
                return await saveUserToDatabase(data)
            }catch(error:any){
                throw new Error(error?.message)
            }
        }
    };
};
