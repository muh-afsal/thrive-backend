import { Notification } from "../entities/notification";

export interface INotificationRepository {
  sendNotification: any;
  sendmail(notification: Notification): Promise<void>;
}
