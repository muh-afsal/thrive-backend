"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const completeProfile_1 = require("./completeProfile");
const fetchUserController_1 = require("./fetchUserController");
const controllers = (dependencies) => {
    return {
        completeProfile: (0, completeProfile_1.completeProfileController)(dependencies),
        fetchUser: fetchUserController_1.fetchUser
    };
};
exports.controllers = controllers;
