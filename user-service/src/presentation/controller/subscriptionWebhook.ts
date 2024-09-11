import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import { User } from "../../infrastructure/database/mongodb/models/userSchema";
import { STRIPE_ENDPOINT_SECRET_KEY } from "../../config/envConfig/config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

const STRIPE_ENDPOINT_SECRET = STRIPE_ENDPOINT_SECRET_KEY;

export const subscriptionWebhookController = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("here in webhook*****************************************");
    const stripeSignature = req.headers["stripe-signature"];
    if (!stripeSignature) {
      throw new Error("No stripe signature found!");
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        stripeSignature.toString(),
        STRIPE_ENDPOINT_SECRET as string
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
    }

    if (event.type === "checkout.session.completed") {
      const checkoutSession = event.data.object as Stripe.Checkout.Session;

      console.log(
        checkoutSession,
        "55555555555555555555555555555555555555555555555555555555555555555555555"
      );

      const userEmail = checkoutSession.metadata?.userEmail as string;
      const userId = checkoutSession.metadata?.userId as string;

      const subscriptionData = {
        paymentStatus: checkoutSession.payment_status,
        planType: "pro",
        isProUser: true,
        isActive: true,
        expiration: new Date(),
      };

      const transactionData = {
        transactionType: "credit",
        message: "Pro subscription payment",
        date: new Date(),
        amount: parseFloat(checkoutSession.metadata?.amount as string),
        transactionID: checkoutSession.payment_intent?.toString() || "",
      };

      try {
        const user = await User.findOne({ email: userEmail });

        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        if (!user.subscription) {
          user.subscription = [];
        }

        if (!user.transactions) {
          user.transactions = [];
        }

        user.subscription.push(subscriptionData);
        user.transactions.push(transactionData);

        await user.save();

        res.status(200).json({ received: true });
      } catch (error) {
        console.error("Error updating subscription:", error);
        return res.status(500).send("Internal Server Error");
      }
    } else {
      // Handle other event types as needed
      console.log(`Unhandled event type ${event.type}`);
    }
  };
};
