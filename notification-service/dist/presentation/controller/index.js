"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const notificationActions_1 = require("./notificationActions");
const getNotifications_1 = require("./getNotifications");
const controllers = (dependencies) => {
    return {
        saveNotification: (0, notificationActions_1.saveNotificationController)(dependencies),
        getNotifications: (0, getNotifications_1.getNotificationsByUserController)(),
    };
};
exports.controllers = controllers;
