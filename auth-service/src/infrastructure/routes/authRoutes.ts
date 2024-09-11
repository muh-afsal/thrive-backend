import { Router } from "express";
import { IDependencies } from "../../application/interface/IDependencies";
import { controllers } from "../../presentation/controller";

export const authRoutes = (dependencies: IDependencies) => {
  const { signup,login,googleAuth,resendOtp,checkEmail,verifyotp } = controllers(dependencies);

  const router = Router();

  router.route("/signup").post(signup);
  router.route("/login").post(login);
  router.route("/google").post(googleAuth);
  router.route("/resend-otp").post(resendOtp);
  router.route("/check-email").post(checkEmail);
  router.route("/verify-otp").post(verifyotp);

  return router;

};

