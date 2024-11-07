import { ObjectId } from "mongoose";
import { ChatEntity, ChatMessageEntity, userSchemaEntity,BlogEntity } from "../../domain/entities";
import { EventEntity } from "../../domain/entities/eventEntity";

export interface IRepositories {
    searchUsers: (query: string) => Promise<userSchemaEntity[] | null>;
    createAChatToDB: (data: ChatEntity) => Promise<ChatEntity |null>;
    sendChatMessage: (data: ChatMessageEntity) => Promise<ChatMessageEntity |null>;
    fetchAllChats: (userId: any) => Promise<ChatEntity[] |null>;
    fetchAllChatMessages: (query:string) => Promise<ChatMessageEntity[] |null>;
    // saveCallLogs: (data:CallLogsEntity) => Promise<CallLogsEntity[] |null>;
    // fetchCallLogs: () => Promise<any[] |null>;
    addBlogRepo: (data:BlogEntity) => Promise<BlogEntity |null>;
    fetchAllBlogs: () => Promise<BlogEntity[] |null>;
    addEventRepo: (data: EventEntity) => Promise<EventEntity |null>;
    editEventRepo: (eventId:string,data: EventEntity) => Promise<EventEntity |null>;
    deleteEventRepo: (data:string) => Promise<void>; 
}
