"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const controllers = (dependencies) => {
    return {
        notificationActions: notificationActionsController(dependencies),
    };
};
exports.controllers = controllers;
