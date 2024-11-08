"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotificationsByUserController = void 0;
const notificationSchema_1 = require("../../infrastructure/database/mongodb/models/notificationSchema");
const getNotificationsByUserController = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            //   console.log(userId,'llllllllllllllllllllll');
            const notifications = yield notificationSchema_1.Notification.find({ userId })
                .sort({ createdAt: -1 })
                .exec();
            res.status(200).json({
                success: true,
                message: "Notifications fetched successfully",
                notifications,
            });
        }
        catch (error) {
            console.error("Error fetching notifications by user:", error);
            res.status(500).json({
                success: false,
                message: "Unable to retrieve notifications at this time. Please try again later.",
                error: error.message,
            });
        }
    });
};
exports.getNotificationsByUserController = getNotificationsByUserController;
