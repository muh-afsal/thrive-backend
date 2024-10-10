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
exports.createAGroupChatController = void 0;
const mongoose_1 = require("mongoose");
const chatSchema_1 = require("../../../infrastructure/database/mongodb/models/chatSchema");
const createAGroupChatController = (dependencies) => {
    const { useCases: { createAChatUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, participants, groupIcon, currentUserId } = req.body;
            // console.log(name,participants,'group details ((((((((((((((((((((((((((((');
            if (!name || !participants || !currentUserId) {
                res.status(400).json({
                    message: "Group name and current user and participants required to proceed further!.",
                });
            }
            // Define chatData as a plain object
            const GroupchatData = {
                name: name,
                isGroupChat: true,
                lastMessage: null,
                participants: participants,
                admin: new mongoose_1.Types.ObjectId(currentUserId),
                groupIcon: groupIcon
            };
            const newChatDocument = new chatSchema_1.Chat(GroupchatData);
            const newChat = yield createAChatUseCase(dependencies).execute(newChatDocument);
            res.status(201).json({
                message: "group chat created successfully",
                chat: newChat,
                success: true
            });
        }
        catch (error) {
            console.error("Error creating chat:", error);
            res.status(500).json({ message: "Server error", error: error.message });
        }
    });
};
exports.createAGroupChatController = createAGroupChatController;
