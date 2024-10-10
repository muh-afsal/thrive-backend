// src/application/interface/IRepositories.ts

import { userSchemaEntity, Subscription, Transaction } from "../../domain/entities";

export interface IRepositories {
    getUserById: (id: string) => Promise<userSchemaEntity | null>;
    updateSubscriptionDetails: (
        email: string,
        subscriptionData: Partial<Subscription>,
        transactionData: Partial<Transaction>
    ) => Promise<userSchemaEntity | null>;
}
