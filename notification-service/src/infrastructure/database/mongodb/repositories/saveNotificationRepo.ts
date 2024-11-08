 
import { NotificationEntity } from "../../../../domain/entities/notificationEntity"; 
import { Notification } from "../models/notificationSchema";

export const saveNotificationRepo = async (notificationData: NotificationEntity): Promise<any> => {
  try {
    console.log(notificationData,'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
    
    const newNotification = new Notification(notificationData); 

    const savedNotification = await newNotification.save();

    return savedNotification; 
  } catch (error: any) {
    throw new Error(`Error saving notification: ${error.message}`);
  }
};
