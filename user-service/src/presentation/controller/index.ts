import { IDependencies } from "../../application/interface/IDependencies";
import { completeProfileController } from "./completeProfile";
import { fetchUser } from "./fetchUserController";

export const controllers = (dependencies: IDependencies)=>{
    
    return{
        completeProfile: completeProfileController(dependencies),
        fetchUser:fetchUser
    }
}