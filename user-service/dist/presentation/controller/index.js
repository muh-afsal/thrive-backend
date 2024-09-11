"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const completeProfile_1 = require("./completeProfile");
const fetchUserController_1 = require("./fetchUserController");
const createSubscriptionSession_1 = require("./createSubscriptionSession");
const subscriptionWebhook_1 = require("./subscriptionWebhook");
const logoutUser_1 = require("./logoutUser");
const changePassword_1 = require("./changePassword");
const controllers = (dependencies) => {
    return {
        completeProfile: (0, completeProfile_1.completeProfileController)(dependencies),
        fetchUser: fetchUserController_1.fetchUser,
        createSubscriptionSession: (0, createSubscriptionSession_1.createSubscriptionSessionController)(dependencies),
        subscriptionWebhook: subscriptionWebhook_1.subscriptionWebhookController,
        changePassword: changePassword_1.changePasswordController,
        logoutUser: logoutUser_1.logoutController,
    };
};
exports.controllers = controllers;
