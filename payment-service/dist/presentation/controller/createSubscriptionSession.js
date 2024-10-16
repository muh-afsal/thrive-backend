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
exports.createSubscriptionSessionController = void 0;
const stripe_1 = __importDefault(require("stripe"));
const config_1 = require("../../config/envConfig/config");
const config_2 = require("../../config/envConfig/config");
const repositories_1 = require("../../infrastructure/database/mongodb/repositories");
const stripe = new stripe_1.default(config_1.STRIPE_SECRET, {
    apiVersion: "2024-06-20",
});
const createSubscriptionSessionController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { email, userId } = req.body;
        const priceId = 'price_1PyoRlAfLu7cproE7f47cOFQ';
        if (!email || !userId) {
            return res
                .status(400)
                .json({ error: "Email and userId are required" });
        }
        try {
            const user = yield (0, repositories_1.getUserById)(userId);
            console.log(user);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            const hasProSubscription = (_a = user.subscription) === null || _a === void 0 ? void 0 : _a.some((sub) => sub.planType === "pro" && sub.isActive === true);
            if (hasProSubscription) {
                return res.status(200).json({ error: "You have already purchased the Pro version." });
            }
            const lineItems = [
                {
                    price: priceId,
                    quantity: 1,
                },
            ];
            const session = yield stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: lineItems,
                mode: "subscription",
                success_url: `${config_2.FRONTEND_URL}/payment-success`,
                cancel_url: `${config_2.FRONTEND_URL}/payment-failed`,
                metadata: {
                    userId: userId.toString(),
                    userEmail: email,
                    amount: 499,
                },
            });
            res.status(200).json({ success: true, id: session.id, message: "Subscription response" });
        }
        catch (error) {
            next(error);
        }
    });
};
exports.createSubscriptionSessionController = createSubscriptionSessionController;
