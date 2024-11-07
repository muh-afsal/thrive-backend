import express, { Router } from "express";
import { IDependencies } from "../../application/interface/IDependencies";
import { controllers } from "../../presentation/controller";

export const mediaRoutes = (dependencies: IDependencies) => {
  const { createAChat,searchUser ,createAGroupChat,fetchAllChats,sendChatMessage,fetchAllChatMessages,saveCallLogs,fetchCallLogs,addBlog,fetchAllBlogs,fetchABlogs,fetchMyBlogs,removeBlog,manageEventActions,fetchEvents} = controllers(dependencies);
  
  const router = Router();

  router.route("/search-users").get(searchUser); 
  router.route("/create-chat").post(createAChat); 
  router.route("/create-group-chat").post(createAGroupChat); 
  router.route("/get-all-chats/:userId").get(fetchAllChats); 
  router.route("/send-message").post(sendChatMessage); 
  router.route("/get-all-messages").get(fetchAllChatMessages); 
  router.route("/save-callLogs").post(saveCallLogs); 
  router.route("/get-callLogs").get(fetchCallLogs); 
  router.route("/add-blog").post(addBlog); 
  router.route("/get-all-blogs").get(fetchAllBlogs); 
  router.route('/get-blog/:blogId').get( fetchABlogs);
  router.route('/get-myblogs/:userId').get( fetchMyBlogs);
  router.route('/remove-blog/:blogId').delete( removeBlog);
  router.route('/event-action').post(manageEventActions);
  router.route('/get-events/:userId').get(fetchEvents);

  return router;
};
