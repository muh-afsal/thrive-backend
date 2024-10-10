import { IDependencies } from "../../application/interface/IDependencies";
import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import { STRIPE_SECRET } from "../../config/envConfig/config";
import { FRONTEND_URL } from "../../config/envConfig/config";


const stripe = new Stripe(STRIPE_SECRET as string, {
  apiVersion: "2024-06-20",
});

export const createCustomerPaymentPortalController = (dependencies: IDependencies) => {


  return async (req: Request, res: Response, next: NextFunction) => {
    

    // console.log(req.body,'reached the create session of payment )))))))))))))))))))');
    

   
    try {
    //   const user = await getUserById(userId);
    //  console.log(user);

    //   if (!user) {
    //     return res.status(404).json({ error: "User not found" });
    //   }

    //   const hasProSubscription = user.subscription?.some(
    //     (sub: any) => sub.planType === "pro" && sub.isActive === true
    //   );

    //   if (hasProSubscription) {
    //     return res.status(200).json({ error: "You have already purchased the Pro version." });
    //   }

     
      

      const Protalsession = await stripe.billingPortal.sessions.create({
           customer:req.params.customerId,
           return_url:`${FRONTEND_URL}/payment`
      });
      

      res.status(200).json({ success: true, message: "Subscription billing details" });
    } catch (error) {
      next(error);
    }
  };
};
