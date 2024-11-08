import express, { Router } from "express";
import { IDependencies } from "../../application/interface/IDependencies";
import { controllers } from "../../presentation/controller";

export const notificationRoutes = (dependencies: IDependencies) => {
  const { saveNotification,getNotifications} = controllers(dependencies);
  
  const router = Router();

  router.route("/add-notification").post(saveNotification); 
  router.route("/get-notification/:userId").get(getNotifications); 
  

  return router;
};
