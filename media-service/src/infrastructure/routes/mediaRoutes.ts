import express, { Router } from "express";
import { IDependencies } from "../../application/interface/IDependencies";
import { controllers } from "../../presentation/controller";

export const mediaRoutes = (dependencies: IDependencies) => {
  const { createAChat,searchUser ,createAGroupChat,fetchAllChats,sendChatMessage,fetchAllChatMessages} = controllers(dependencies);
  
  const router = Router();

  router.route("/search-users").get(searchUser); 
  router.route("/create-chat").post(createAChat); 
  router.route("/create-group-chat").post(createAGroupChat); 
  router.route("/get-all-chats").get(fetchAllChats); 
  router.route("/send-message").post(sendChatMessage); 
  router.route("/get-all-messages").get(fetchAllChatMessages); 

  return router;
};
