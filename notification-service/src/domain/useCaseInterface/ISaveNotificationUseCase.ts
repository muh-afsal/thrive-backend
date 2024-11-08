import { NotificationEntity } from "../entities/notificationEntity";


export interface ISaveNotificationUseCase {
  execute(notification:NotificationEntity): Promise< void>;
}
