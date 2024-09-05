import { IOtpUseCase } from "../../domain/useCaseInterface/index.js";
import { IDependencies } from "../interface/IDependencies.js";

export const otpUseCase = (dependencies: IDependencies): IOtpUseCase => {
    const { repositories: {saveOTP,verifyOTP } } = dependencies;

    return {
        generateOTP: () => {
            return Math.floor(1000 + Math.random() * 9000).toString();
        },

        saveOTP: async (email: string, otp: string): Promise<void> => {
            try {
                await saveOTP(email, otp);
            } catch (error: any) {
                throw new Error(error?.message);
            }
        },

        verifyOTP: async (email: string, submittedOTP: string): Promise<boolean> => {
            try {
                return await verifyOTP(email, submittedOTP);
            } catch (error: any) {
                throw new Error(error?.message);
            }
        }
    };
};
