import { IDependencies } from "../../application/interface/IDependencies";
import { loginController } from "./login";
import { signupController } from "./signUp"
import { googleAuthController } from "./googleAuth"
import { resendOtpController } from "./resendOtp";
import { checkEmailController } from "./checkEmail";
import { verifyOtpController } from "./verifyOtp";
import { completeProfileController } from "./completeProfile";
import { fetchUser } from "./fetchUserController";
import { changePasswordController } from "./changePassword";
import { logoutController } from "./logoutUser";
import { changeEmailController } from "./changeEmail";

export const controllers = (dependencies: IDependencies)=>{
    
    return{
        signup: signupController(dependencies),
        login: loginController(dependencies),
        googleAuth: googleAuthController(dependencies),
        resendOtp:resendOtpController(dependencies),
        checkEmail:checkEmailController(dependencies),
        verifyotp:verifyOtpController(dependencies),
        completeProfile: completeProfileController(dependencies),
        fetchUser: fetchUser,
        changePassword:changePasswordController,
        logoutUser:logoutController,
        changeEmail:changeEmailController,

    }
}