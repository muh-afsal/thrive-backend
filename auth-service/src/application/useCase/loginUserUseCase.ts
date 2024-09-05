import { authLoginEntity } from "../../domain/entities";
import { IDependencies } from "../interface/IDependencies";

export const loginUserUseCase=(dependencies:IDependencies)=>{
    const {repositories:{login}} = dependencies;

    return{
        execute:async(data:authLoginEntity)=>{
            try{
                return await login(data)
            }catch(error:any){
                throw new Error(error?.message)
            }
        }
    }
}