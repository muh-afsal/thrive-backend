import { IDependencies } from "../../application/interface/IDependencies";
import { createSubscriptionSessionController } from "./createSubscriptionSession";
import { fetchUser } from "./fetchUserController";
import { subscriptionWebhookController } from "./subscriptionWebhook";


export const controllers = (dependencies: IDependencies) => {
    return {
        fetchUser: fetchUser,
        createSubscriptionSession: createSubscriptionSessionController(dependencies),
        subscriptionWebhook: subscriptionWebhookController, 
      
    };
};
