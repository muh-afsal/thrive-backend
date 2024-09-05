import { IDependencies } from "../../application/interface/IDependencies";
import { loginController } from "./login";
import { signupController } from "./signUp"
import { googleAuthController } from "./googleAuth"

export const controllers = (dependencies: IDependencies)=>{
    
    return{
        signup: signupController(dependencies),
        login: loginController(dependencies),
        googleAuth: googleAuthController(dependencies),

    }
}