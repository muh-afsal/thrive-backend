
import { ObjectId } from "mongoose";
import { NotificationEntity } from "../../domain/entities/notificationEntity";



export interface IRepositories {
    saveNotificationRepo: (notification:NotificationEntity) => Promise<void>;
}
