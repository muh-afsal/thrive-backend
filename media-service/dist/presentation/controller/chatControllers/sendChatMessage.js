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
exports.sendChatMessageController = void 0;
const sendChatMessageController = (dependencies) => {
    const { useCases: { sendChatMessageUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { sender, content, attachments, chat } = req.body;
            // console.log(req.body);
            const chatMessageData = ({
                sender: sender || undefined,
                content,
                attachments: attachments || [],
                chat,
            });
            // console.log(chatMessageData,'sender=======================');
            // console.log(chatMessageData.chat,'chat --------------------------------------------------');
            if (!chatMessageData.sender || !chatMessageData.chat) {
                throw new Error('Missing required fields: sender or chat');
            }
            const completeChatMessage = Object.assign(Object.assign({}, chatMessageData), { createdAt: new Date(), updatedAt: new Date() });
            const savedMessage = yield sendChatMessageUseCase(dependencies).execute(completeChatMessage);
            res.status(201).json({
                success: true,
                message: "Message sent successfully",
                chatMessage: savedMessage,
            });
        }
        catch (error) {
            console.error("Error sending chat message:", error);
            res.status(400).json({ message: "Server error", error: error.message });
        }
    });
};
exports.sendChatMessageController = sendChatMessageController;
