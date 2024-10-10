"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomerPaymentPortalController = void 0;
const stripe_1 = __importDefault(require("stripe"));
const config_1 = require("../../config/envConfig/config");
const config_2 = require("../../config/envConfig/config");
const stripe = new stripe_1.default(config_1.STRIPE_SECRET, {
    apiVersion: "2024-06-20",
});
const createCustomerPaymentPortalController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            const Protalsession = yield stripe.billingPortal.sessions.create({
                customer: req.params.customerId,
                return_url: `${config_2.FRONTEND_URL}/payment`
            });
            res.status(200).json({ success: true, message: "Subscription billing details" });
        }
        catch (error) {
            next(error);
        }
    });
};
exports.createCustomerPaymentPortalController = createCustomerPaymentPortalController;
