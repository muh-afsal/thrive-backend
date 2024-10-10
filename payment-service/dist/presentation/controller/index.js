"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const createSubscriptionSession_1 = require("./createSubscriptionSession");
const fetchUserController_1 = require("./fetchUserController");
const subscriptionWebhook_1 = require("./subscriptionWebhook");
const controllers = (dependencies) => {
    return {
        fetchUser: fetchUserController_1.fetchUser,
        createSubscriptionSession: (0, createSubscriptionSession_1.createSubscriptionSessionController)(dependencies),
        subscriptionWebhook: subscriptionWebhook_1.subscriptionWebhookController,
    };
};
exports.controllers = controllers;
