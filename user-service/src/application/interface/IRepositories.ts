// src/application/interface/IRepositories.ts

import { userSchemaEntity, Subscription, Transaction } from "../../domain/entities";

export interface IRepositories {
    saveUserToDatabase: (data: userSchemaEntity) => Promise<userSchemaEntity | null>;
    completeProfile: (data: userSchemaEntity) => Promise<userSchemaEntity | null>;
    getUserById: (id: string) => Promise<userSchemaEntity | null>;
    updateSubscriptionDetails: (
        email: string,
        subscriptionData: Partial<Subscription>,
        transactionData: Partial<Transaction>
    ) => Promise<userSchemaEntity | null>;
}
