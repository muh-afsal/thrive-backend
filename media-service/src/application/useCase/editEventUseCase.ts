import { IDependencies } from "../../application/interface/IDependencies";
import { EventEntity } from "../../domain/entities/eventEntity";

export const editEventUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (eventId: string, data: EventEntity) => {
      try {
      const response=await repositories.editEventRepo(eventId,data);
      return response
      } catch (error) {
        throw new Error((error as Error)?.message || "Error in editing event");
      }
    },
  };
};
