import { NextFunction, Response, Request } from "express";
import { IDependencies } from "../../application/interface/IDependencies"; 
import { NotificationEntity } from "../../domain/entities/notificationEntity";  

export const saveNotificationController = (dependencies: IDependencies) => {
  const {
    useCases: { saveNotificationUseCase }, 
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { userId, message } = req.body; 

      if (!userId || !message) {
        return res.status(400).json({ message: "userId and message are required" });
      }

      const notificationData: NotificationEntity = { userId, message };

      const savedNotification = await saveNotificationUseCase(dependencies).execute(notificationData);

      res.status(201).json({
        message: "Notification saved successfully",
        data: savedNotification,
      });
    } catch (error: any) {
      console.error("Error saving notification:", error);
      res.status(400).json({ message: "Server error", error: error.message });
    }
  };
};
