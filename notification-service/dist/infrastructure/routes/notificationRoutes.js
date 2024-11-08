"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../presentation/controller");
const notificationRoutes = (dependencies) => {
    const { saveNotification, getNotifications } = (0, controller_1.controllers)(dependencies);
    const router = (0, express_1.Router)();
    router.route("/add-notification").post(saveNotification);
    router.route("/get-notification/:userId").get(getNotifications);
    return router;
};
exports.notificationRoutes = notificationRoutes;
