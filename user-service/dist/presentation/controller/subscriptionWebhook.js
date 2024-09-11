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
exports.subscriptionWebhookController = void 0;
const stripe_1 = __importDefault(require("stripe"));
const userSchema_1 = require("../../infrastructure/database/mongodb/models/userSchema");
const config_1 = require("../../config/envConfig/config");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20",
});
const STRIPE_ENDPOINT_SECRET = config_1.STRIPE_ENDPOINT_SECRET_KEY;
const subscriptionWebhookController = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        console.log("here in webhook*****************************************");
        const stripeSignature = req.headers["stripe-signature"];
        if (!stripeSignature) {
            throw new Error("No stripe signature found!");
        }
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body, stripeSignature.toString(), STRIPE_ENDPOINT_SECRET);
        }
        catch (err) {
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }
        if (event.type === "checkout.session.completed") {
            const checkoutSession = event.data.object;
            console.log(checkoutSession, "55555555555555555555555555555555555555555555555555555555555555555555555");
            const userEmail = (_a = checkoutSession.metadata) === null || _a === void 0 ? void 0 : _a.userEmail;
            const userId = (_b = checkoutSession.metadata) === null || _b === void 0 ? void 0 : _b.userId;
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
                amount: parseFloat((_c = checkoutSession.metadata) === null || _c === void 0 ? void 0 : _c.amount),
                transactionID: ((_d = checkoutSession.payment_intent) === null || _d === void 0 ? void 0 : _d.toString()) || "",
            };
            try {
                const user = yield userSchema_1.User.findOne({ email: userEmail });
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
                yield user.save();
                res.status(200).json({ received: true });
            }
            catch (error) {
                console.error("Error updating subscription:", error);
                return res.status(500).send("Internal Server Error");
            }
        }
        else {
            // Handle other event types as needed
            console.log(`Unhandled event type ${event.type}`);
        }
    });
};
exports.subscriptionWebhookController = subscriptionWebhookController;
