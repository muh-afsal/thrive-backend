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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubscriptionDetails = void 0;
const userSchema_1 = require("../models/userSchema");
const updateSubscriptionDetails = (email, subscriptionData, transactionData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userSchema_1.User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        if (subscriptionData) {
            user.subscription = user.subscription || [];
            const existingSubscription = user.subscription.find((sub) => sub.planType === subscriptionData.planType);
            if (existingSubscription) {
                Object.assign(existingSubscription, subscriptionData);
            }
            else {
                user.subscription.push(subscriptionData);
            }
        }
        if (transactionData) {
            user.transactions = user.transactions || [];
            user.transactions.push(transactionData);
        }
        const updatedUser = yield user.save();
        return updatedUser;
    }
    catch (error) {
        console.error('Error updating subscription details:', error.message);
        throw new Error(error.message);
    }
});
exports.updateSubscriptionDetails = updateSubscriptionDetails;
