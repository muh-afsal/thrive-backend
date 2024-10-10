import express, { Router } from "express";
import { IDependencies } from "../../application/interface/IDependencies";
import { controllers } from "../../presentation/controller";

export const paymentRoutes = (dependencies: IDependencies) => {
  const {
    subscriptionWebhook,
    fetchUser,
    createSubscriptionSession,
  } = controllers(dependencies);

  const router = Router();
  const app = express();

  router.post("/webhook",express.raw({ type: "application/json" }),subscriptionWebhook());
  router.route("/create-checkout-session").post(createSubscriptionSession);
  router.route("/getuserdata/:userId").get(fetchUser);

  return router;
};
