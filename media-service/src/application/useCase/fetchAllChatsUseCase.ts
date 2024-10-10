import { IDependencies } from "../../application/interface/IDependencies";
import { ChatEntity } from "../../domain/entities";

export const fetchAllChatsUseCase = (dependencies: IDependencies) => {
  const { repositories: { fetchAllChats } } = dependencies;

  return {
    execute: async (): Promise<ChatEntity[] | null> => {
      try {
        const allChats = await fetchAllChats();
        return allChats;
      } catch (error: any) {
        throw new Error(error?.message || "Error searching users");
      }
    }
  };
};
