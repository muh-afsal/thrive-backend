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
exports.fetchAllChats = void 0;
const chatSchema_1 = require("../models/chatSchema");
const fetchAllChats = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allChats = yield chatSchema_1.Chat.find()
            .populate({
            path: 'participants',
            match: { role: 'user' },
            select: 'firstname lastname email phone profileImage',
        })
            .exec();
        return allChats;
    }
    catch (error) {
        console.error('Error fetching chats:', error.message);
        throw new Error(error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.fetchAllChats = fetchAllChats;
