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
exports.createAChatToDB = void 0;
const chatSchema_1 = require("../models/chatSchema");
const createAChatToDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chatData = {
            name: data.isGroupChat ? data.name : "one-to-one",
            participants: data.participants,
            isGroupChat: data.isGroupChat,
            lastMessage: data.lastMessage || null,
            admin: data.admin,
            groupIcon: data.isGroupChat ? data.groupIcon : null
        };
        const newChat = new chatSchema_1.Chat(chatData);
        const savedChat = yield newChat.save();
        return savedChat;
    }
    catch (error) {
        console.error('Error creating a chat:', error.message);
        throw new Error(error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.createAChatToDB = createAChatToDB;
