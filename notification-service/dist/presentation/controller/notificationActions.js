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
exports.saveNotificationController = void 0;
const saveNotificationController = (dependencies) => {
    const { useCases: { saveNotificationUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, message } = req.body;
            if (!userId || !message) {
                return res.status(400).json({ message: "userId and message are required" });
            }
            const notificationData = { userId, message };
            const savedNotification = yield saveNotificationUseCase(dependencies).execute(notificationData);
            res.status(201).json({
                message: "Notification saved successfully",
                data: savedNotification,
            });
        }
        catch (error) {
            console.error("Error saving notification:", error);
            res.status(400).json({ message: "Server error", error: error.message });
        }
    });
};
exports.saveNotificationController = saveNotificationController;
