import { IDependencies } from "../../application/interface/IDependencies";

export const saveOtpUseCase = (dependencies: IDependencies) => {
  const { repositories: { saveOTP } } = dependencies;

  return {
    execute: async (email: string, otp: string): Promise<void> => {
      try {
        await saveOTP(email, otp);
      } catch (error: any) {
        throw new Error(error?.message);
      }
    }
  };
};
