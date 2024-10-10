import { IDependencies } from "../../application/interface/IDependencies";
import { ChatEntity } from "../../domain/entities";

export const createAChatUseCase = (dependencies: IDependencies) => {
    const { repositories: { createAChatToDB } } = dependencies;
        
    return {
        execute: async (data: ChatEntity)=> {
            try {
                const chatResponse = await createAChatToDB(data);
                return chatResponse;
            } catch (error) {
                throw new Error((error as Error)?.message || "Error creating a chat");
            }
        }
    };
};
