import { IDependencies } from "../interface/IDependencies";

export const fetchUser = (dependencies: IDependencies)=> {
    const {repositories:{getUserById}} = dependencies;
    return {
        execute: async (id:string) => {
            try{
                return await getUserById(id)
            }catch(error:any){
                throw new Error(error?.message)
            }
        }
    };
};
