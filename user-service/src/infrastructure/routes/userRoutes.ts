import express, { Router } from "express";
import { IDependencies } from "../../application/interface/IDependencies";
import { controllers } from "../../presentation/controller";

export const userRoutes = (dependencies: IDependencies) => {
  const {
    subscriptionWebhook,
    completeProfile,
    fetchUser,
    createSubscriptionSession,
    logoutUser,
    changePassword
  } = controllers(dependencies);

  const router = Router();
  const app = express();

  router.post("/webhook",express.raw({ type: "application/json" }),subscriptionWebhook());
  router.route("/create-checkout-session").post(createSubscriptionSession);
  router.route("/completeprofile").post(completeProfile);
  router.route("/getuserdata/:userId").get(fetchUser);
  router.route("/editProfile").post(completeProfile);
  router.route("/change-password").post(changePassword);
  router.route("/logout").post(logoutUser);

  return router;
};
