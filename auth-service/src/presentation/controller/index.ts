import { IDependencies } from "../../application/interface/IDependencies";
import { loginController } from "./login";
import { signupController } from "./signUp"
import { googleAuthController } from "./googleAuth"
import { resendOtpController } from "./resendOtp";
import { checkEmailController } from "./checkEmail";
import { verifyOtpController } from "./verifyOtp";
import { verify } from "jsonwebtoken";

export const controllers = (dependencies: IDependencies)=>{
    
    return{
        signup: signupController(dependencies),
        login: loginController(dependencies),
        googleAuth: googleAuthController(dependencies),
        resendOtp:resendOtpController(dependencies),
        checkEmail:checkEmailController(dependencies),
        verifyotp:verifyOtpController(dependencies)

    }
}