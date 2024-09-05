import { Notification } from "../entities/notification";

export interface INotificationRepository {
  sendNotification(notification: Notification): Promise<void>;
}
