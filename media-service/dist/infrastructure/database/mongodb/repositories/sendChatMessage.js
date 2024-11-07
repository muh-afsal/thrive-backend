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
exports.sendChatMessage = void 0;
const chatMessageSchema_1 = require("../models/chatMessageSchema");
const chatSchema_1 = require("../models/chatSchema");
const sendChatMessage = (chatData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = new chatMessageSchema_1.ChatMessage({
            sender: chatData.sender,
            content: chatData.content,
            attachments: chatData.attachments || [],
            chat: chatData.chat,
        });
        const savedMessage = yield message.save();
        yield chatSchema_1.Chat.findByIdAndUpdate(chatData.chat, { lastMessage: savedMessage._id }, { new: true });
        return savedMessage;
    }
    catch (error) {
        console.error('Error saving message to database:', error);
        throw error;
    }
});
exports.sendChatMessage = sendChatMessage;
