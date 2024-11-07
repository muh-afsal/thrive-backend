import { ObjectId } from "mongoose";
import { IDependencies } from "../../application/interface/IDependencies";
import { ChatEntity } from "../../domain/entities";

export const fetchAllChatsUseCase = (dependencies: IDependencies) => {
  const { repositories: { fetchAllChats } } = dependencies;

  return {
    execute: async (userId: any): Promise<ChatEntity[] | null> => {
      try {
        const allChats = await fetchAllChats(userId);
        return allChats;
      } catch (error: any) {
        throw new Error(error?.message || "Error searching users");
      }
    }
  };
};
