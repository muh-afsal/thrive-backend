import { IDependencies } from "../../application/interface/IDependencies";
import { EventEntity } from "../../domain/entities/eventEntity";

export const addEventUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (data: EventEntity) => {
      try {
        const addedEvent=await repositories.addEventRepo(data);
        return addedEvent
      } catch (error) {
        throw new Error((error as Error)?.message || "Error in adding event");
      }
    },
  };
};
