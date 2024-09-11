import { IDependencies } from "../../application/interface/IDependencies";
import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import { STRIPE_SECRET } from "../../config/envConfig/config";
import { FRONTEND_URL } from "../../config/envConfig/config";
import { getUserById } from '../../infrastructure/database/mongodb/repositories';

const stripe = new Stripe(STRIPE_SECRET as string, {
  apiVersion: "2024-06-20",
});

export const createSubscriptionSessionController = (dependencies: IDependencies) => {


  return async (req: Request, res: Response, next: NextFunction) => {
    const { email, userId } = req.body;

    if (!email || !userId) {
      return res
        .status(400)
        .json({ error: "Email and userId are required" });
    }

    try {
      const user = await getUserById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const hasProSubscription = user.subscription?.some(
        (sub: any) => sub.planType === "pro" && sub.isActive === true
      );

      if (hasProSubscription) {
        return res.status(200).json({ error: "You have already purchased the Pro version." });
      }

      const lineItems = [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: "Upgrade to Pro Version",
            },
            unit_amount: Math.floor(1499 * 100),
          },
          quantity: 1,
        },
      ];

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${FRONTEND_URL}/payment-success`,
        cancel_url: `${FRONTEND_URL}/payment-failed`,
        metadata: {
          userId: userId.toString(),
          userEmail: email,
          amount: 1499,
        },
      });

      res.status(200).json({ success: true, id: session.id, message: "Subscription response" });
    } catch (error) {
      next(error);
    }
  };
};
