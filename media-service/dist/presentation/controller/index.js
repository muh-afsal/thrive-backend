"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const searchUser_1 = require("./chatControllers/searchUser");
const createAChat_1 = require("./chatControllers/createAChat");
const createAGroupChat_1 = require("./chatControllers/createAGroupChat");
const fetchAllChats_1 = require("./chatControllers/fetchAllChats");
const sendChatMessage_1 = require("./chatControllers/sendChatMessage");
const fetchAllChatMessages_1 = require("./chatControllers/fetchAllChatMessages");
const SaveCallLogs_1 = require("./callControllers/SaveCallLogs");
const fetchCallLogs_1 = require("./callControllers/fetchCallLogs");
const addBlog_1 = require("./blogControllers/addBlog");
const getBlogs_1 = require("./blogControllers/getBlogs");
const getABlog_1 = require("./blogControllers/getABlog");
const getMyBlogs_1 = require("./blogControllers/getMyBlogs");
const removeBlog_1 = require("./blogControllers/removeBlog");
const eventAction_1 = require("./eventControllers/eventAction");
const getEvents_1 = require("./eventControllers/getEvents");
const controllers = (dependencies) => {
    return {
        searchUser: (0, searchUser_1.searchUsersController)(dependencies),
        createAChat: (0, createAChat_1.createAChatController)(dependencies),
        createAGroupChat: (0, createAGroupChat_1.createAGroupChatController)(dependencies),
        fetchAllChats: (0, fetchAllChats_1.fetchAllChatsController)(dependencies),
        sendChatMessage: (0, sendChatMessage_1.sendChatMessageController)(dependencies),
        fetchAllChatMessages: (0, fetchAllChatMessages_1.fetchAllChatMessagesController)(dependencies),
        saveCallLogs: (0, SaveCallLogs_1.saveCallLogsController)(dependencies),
        fetchCallLogs: (0, fetchCallLogs_1.fetchCallLogsController)(dependencies),
        addBlog: (0, addBlog_1.addBlogController)(dependencies),
        fetchAllBlogs: (0, getBlogs_1.fetchAllBlogsController)(dependencies),
        fetchABlogs: (0, getABlog_1.fetchBlogByIdController)(),
        fetchMyBlogs: (0, getMyBlogs_1.fetchBlogsByAuthorController)(),
        removeBlog: (0, removeBlog_1.removeBlogController)(),
        manageEventActions: (0, eventAction_1.manageEventController)(dependencies),
        fetchEvents: (0, getEvents_1.fetchAllEventsController)(dependencies)
    };
};
exports.controllers = controllers;
