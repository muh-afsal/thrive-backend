import {User} from '../models/userSchema';
import { userSchemaEntity,Subscription, Transaction  } from '../../../../domain/entities';


export const updateSubscriptionDetails = async (
  email: string,
  subscriptionData: Partial<Subscription>,
  transactionData: Partial<Transaction>
): Promise<userSchemaEntity | null> => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    if (subscriptionData) {
      user.subscription = user.subscription || [];
      const existingSubscription = user.subscription.find((sub: { planType: string | undefined; }) => sub.planType === subscriptionData.planType);
      if (existingSubscription) {
        Object.assign(existingSubscription, subscriptionData);
      } else {
        user.subscription.push(subscriptionData as Subscription);
      }
    }

    if (transactionData) {
      user.transactions = user.transactions || [];
      user.transactions.push(transactionData as Transaction);
    }

    const updatedUser = await user.save();
    return updatedUser as userSchemaEntity;
  } catch (error: any) {
    console.error('Error updating subscription details:', error.message);
    throw new Error(error.message);
  }
};
