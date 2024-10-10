import { ChatEntity } from "../../../../domain/entities";
import { Chat } from "../models/chatSchema";

export const createAChatToDB = async (data: ChatEntity): Promise<ChatEntity> => {
    try {
        const chatData = {
            name: data.isGroupChat ? data.name : "one-to-one", 
            participants: data.participants,
            isGroupChat: data.isGroupChat,
            lastMessage: data.lastMessage || null,
            admin: data.admin,
            groupIcon: data.isGroupChat ? data.groupIcon : null 
        };

        const newChat = new Chat(chatData);
        const savedChat = await newChat.save();
        return savedChat;
    } catch (error: any) {
        console.error('Error creating a chat:', error.message);
        throw new Error(error?.message);
    }
};
