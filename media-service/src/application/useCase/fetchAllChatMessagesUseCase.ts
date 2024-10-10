import { ObjectId } from "mongoose";
import { IDependencies } from "../../application/interface/IDependencies";
import { ChatEntity, ChatMessageEntity } from "../../domain/entities";

export const fetchAllChatMessagesUseCase = (dependencies: IDependencies) => {
  const { repositories: { fetchAllChatMessages } } = dependencies;

  return {
    execute: async (query:string): Promise<ChatMessageEntity[] | null> => {
      try {
        const allChats = await fetchAllChatMessages(query);
        return allChats;
      } catch (error: any) {
        throw new Error(error?.message || "Error fetching chat messages");
      }
    }
  };
};
