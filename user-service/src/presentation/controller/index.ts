import { IDependencies } from "../../application/interface/IDependencies";
import { completeProfileController } from "./completeProfile";
import { fetchUser } from "./fetchUserController";
import { createSubscriptionSessionController } from "./createSubscriptionSession";
import { subscriptionWebhookController } from "./subscriptionWebhook";
import { logoutController } from "./logoutUser";
import { changePasswordController } from "./changePassword";

export const controllers = (dependencies: IDependencies) => {
    return {
        completeProfile: completeProfileController(dependencies),
        fetchUser: fetchUser,
        createSubscriptionSession: createSubscriptionSessionController(dependencies),
        subscriptionWebhook: subscriptionWebhookController, 
        changePassword:changePasswordController,
        logoutUser:logoutController,
    };
};
