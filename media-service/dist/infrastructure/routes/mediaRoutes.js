"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../presentation/controller");
const mediaRoutes = (dependencies) => {
    const { createAChat, searchUser, createAGroupChat, fetchAllChats, sendChatMessage, fetchAllChatMessages } = (0, controller_1.controllers)(dependencies);
    const router = (0, express_1.Router)();
    router.route("/search-users").get(searchUser);
    router.route("/create-chat").post(createAChat);
    router.route("/create-group-chat").post(createAGroupChat);
    router.route("/get-all-chats").get(fetchAllChats);
    router.route("/send-message").post(sendChatMessage);
    router.route("/get-all-messages").get(fetchAllChatMessages);
    return router;
};
exports.mediaRoutes = mediaRoutes;
