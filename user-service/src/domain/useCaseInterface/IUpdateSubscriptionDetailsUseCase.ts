

import { userSchemaEntity, Subscription, Transaction } from "../entities";

export interface IUpdateSubscriptionDetailsUseCase {
  execute(
    email: string,
    subscriptionData: Partial<Subscription>,
    transactionData: Partial<Transaction>
  ): Promise<userSchemaEntity | null>;
}
