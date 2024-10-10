import { IDependencies } from "../../application/interface/IDependencies";
import { ChatMessageEntity } from "../../domain/entities";

export const sendChatMessageUseCase = (dependencies: IDependencies) => {
  const { repositories: { sendChatMessage } } = dependencies;

  return {
    execute: async (data: ChatMessageEntity): Promise<ChatMessageEntity | null> => {
      try {
        const users = await sendChatMessage(data);
        return users;
      } catch (error: any) {
        throw new Error(error?.message || "Error searching users");
      }
    }
  };
};
