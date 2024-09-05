import { Router } from "express";
import { IDependencies } from "../../application/interface/IDependencies";
import { controllers } from "../../presentation/controller";

export const authRoutes = (dependencies: IDependencies) => {
  const { signup,login,googleAuth } = controllers(dependencies);

  const router = Router();

  router.route("/signup").post(signup);
  router.route("/login").post(login);
  router.route("/google").post(googleAuth);

  return router;

};

