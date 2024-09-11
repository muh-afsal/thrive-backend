"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importStar(require("express"));
const controller_1 = require("../../presentation/controller");
const userRoutes = (dependencies) => {
    const { subscriptionWebhook, completeProfile, fetchUser, createSubscriptionSession, logoutUser, changePassword } = (0, controller_1.controllers)(dependencies);
    const router = (0, express_1.Router)();
    const app = (0, express_1.default)();
    router.post("/webhook", express_1.default.raw({ type: "application/json" }), subscriptionWebhook());
    router.route("/create-checkout-session").post(createSubscriptionSession);
    router.route("/completeprofile").post(completeProfile);
    router.route("/getuserdata/:userId").get(fetchUser);
    router.route("/editProfile").post(completeProfile);
    router.route("/change-password").post(changePassword);
    router.route("/logout").post(logoutUser);
    return router;
};
exports.userRoutes = userRoutes;
