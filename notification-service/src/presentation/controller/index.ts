import { IDependencies } from "../../application/interface/IDependencies";



export const controllers = (dependencies: IDependencies)=>{
    
    return{
        notificationActions: notificationActionsController(dependencies),


    }
}