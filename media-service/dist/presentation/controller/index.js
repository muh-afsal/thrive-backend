"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const searchUser_1 = require("./chatControllers/searchUser");
const createAChat_1 = require("./chatControllers/createAChat");
const createAGroupChat_1 = require("./chatControllers/createAGroupChat");
const fetchAllChats_1 = require("./chatControllers/fetchAllChats");
const sendChatMessage_1 = require("./chatControllers/sendChatMessage");
const fetchAllChatMessages_1 = require("./chatControllers/fetchAllChatMessages");
const controllers = (dependencies) => {
    return {
        searchUser: (0, searchUser_1.searchUsersController)(dependencies),
        createAChat: (0, createAChat_1.createAChatController)(dependencies),
        createAGroupChat: (0, createAGroupChat_1.createAGroupChatController)(dependencies),
        fetchAllChats: (0, fetchAllChats_1.fetchAllChatsController)(dependencies),
        sendChatMessage: (0, sendChatMessage_1.sendChatMessageController)(dependencies),
        fetchAllChatMessages: (0, fetchAllChatMessages_1.fetchAllChatMessagesController)(dependencies),
    };
};
exports.controllers = controllers;
