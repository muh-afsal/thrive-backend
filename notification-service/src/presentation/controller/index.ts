import { IDependencies } from "../../application/interface/IDependencies";
import { saveNotificationController } from "./notificationActions";
import { getNotificationsByUserController } from "./getNotifications";



export const controllers = (dependencies: IDependencies)=>{
    
    return{
        saveNotification: saveNotificationController(dependencies),
        getNotifications: getNotificationsByUserController(),
    }
}