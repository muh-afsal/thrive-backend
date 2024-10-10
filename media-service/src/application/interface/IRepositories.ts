import { ObjectId } from "mongoose";
import { ChatEntity, ChatMessageEntity, userSchemaEntity } from "../../domain/entities";

export interface IRepositories {
    searchUsers: (query: string) => Promise<userSchemaEntity[] | null>;
    createAChatToDB: (data: ChatEntity) => Promise<ChatEntity |null>;
    sendChatMessage: (data: ChatMessageEntity) => Promise<ChatMessageEntity |null>;
    fetchAllChats: () => Promise<ChatEntity[] |null>;
    fetchAllChatMessages: (query:string) => Promise<ChatMessageEntity[] |null>;
}
