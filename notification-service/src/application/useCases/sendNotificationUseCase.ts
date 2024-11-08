import { IDependencies } from "../../application/interface/IDependencies";
import { NotificationEntity } from "../../domain/entities/notificationEntity";

export const saveNotificationUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { saveNotificationRepo },
  } = dependencies;

  return {
    execute: async (notification: NotificationEntity): Promise<void> => {
      try {
        await saveNotificationRepo(notification);
      } catch (error) {
        throw new Error((error as Error)?.message || "Error saving notification");
      }
    },
  };
};
