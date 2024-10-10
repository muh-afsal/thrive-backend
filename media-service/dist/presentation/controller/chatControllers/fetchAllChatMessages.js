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
exports.fetchAllChatMessagesController = void 0;
const fetchAllChatMessagesController = (dependencies) => {
    const { useCases: { fetchAllChatMessagesUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { chatId } = req.query;
            if (!chatId || typeof chatId !== 'string') {
                res.status(400).json({ message: "Invalid chat ID provided." });
                return;
            }
            const chatMessages = yield fetchAllChatMessagesUseCase(dependencies).execute(chatId);
            res.status(200).json({
                success: true,
                message: "Chats fetched successfully",
                chatMessages,
            });
        }
        catch (error) {
            console.error("Error fetching chats:", error);
            res.status(500).json({ message: "Server error", error: error.message });
        }
    });
};
exports.fetchAllChatMessagesController = fetchAllChatMessagesController;
