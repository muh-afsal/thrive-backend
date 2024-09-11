"use strict";
// src/application/useCases/updateSubscriptionDetailsUseCase.ts
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
exports.updateSubscriptionDetailsUseCase = void 0;
const updateSubscriptionDetailsUseCase = (dependencies) => {
    const { repositories: { updateSubscriptionDetails } } = dependencies;
    return {
        execute: (email, subscriptionData, transactionData) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield updateSubscriptionDetails(email, subscriptionData, transactionData);
            }
            catch (error) {
                throw new Error(error === null || error === void 0 ? void 0 : error.message);
            }
        })
    };
};
exports.updateSubscriptionDetailsUseCase = updateSubscriptionDetailsUseCase;
