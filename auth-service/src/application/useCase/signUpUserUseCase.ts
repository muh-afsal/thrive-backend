import { authSignUpEntity } from "../../domain/entities";
import { IDependencies } from "../interface/IDependencies";

export const signupUserUseCase=(dependencies:IDependencies)=>{
    const {repositories:{signup}} = dependencies;
    return{
        execute:async (data:authSignUpEntity)=>{
            try{
                return await signup(data)
            }catch(error:any){
                throw new Error(error?.message)
            }
        }
    }
}

