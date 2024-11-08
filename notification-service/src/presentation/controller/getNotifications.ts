import { Request, Response, NextFunction } from "express"; 
import { Notification } from "../../infrastructure/database/mongodb/models/notificationSchema";

export const getNotificationsByUserController = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
    //   console.log(userId,'llllllllllllllllllllll');
      

      const notifications = await Notification.find({ userId })
        .sort({ createdAt: -1 })
        .exec();

  
      res.status(200).json({
        success: true,
        message: "Notifications fetched successfully",
        notifications,
      });
    } catch (error: any) {
      console.error("Error fetching notifications by user:", error);
      res.status(500).json({
        success: false,
        message: "Unable to retrieve notifications at this time. Please try again later.",
        error: error.message,
      });
    }
  };
};
