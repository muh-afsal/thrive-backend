// src/application/useCases/updateSubscriptionDetailsUseCase.ts

import { IDependencies } from "../interface/IDependencies";
import { userSchemaEntity, Subscription, Transaction } from "../../domain/entities";

export const updateSubscriptionDetailsUseCase = (dependencies: IDependencies) => {
    const { repositories: { updateSubscriptionDetails } } = dependencies;

    return {
        execute: async (email: string, subscriptionData: Partial<Subscription>, transactionData: Partial<Transaction>): Promise<userSchemaEntity | null> => {
            try {
                return await updateSubscriptionDetails(email, subscriptionData, transactionData);
            } catch (error: any) {
                throw new Error(error?.message);
            }
        }
    };
};
