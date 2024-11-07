import { IDependencies } from "../../application/interface/IDependencies";

export const deleteEventUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (eventId: string) => {
      try {
        await repositories.deleteEventRepo(eventId);
      } catch (error) {
        throw new Error((error as Error)?.message || "Error in deleting event");
      }
    },
  };
};
