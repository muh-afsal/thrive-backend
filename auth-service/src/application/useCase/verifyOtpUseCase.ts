import { IDependencies } from "../../application/interface/IDependencies";

export const verifyOtpUseCase = (dependencies: IDependencies) => {
  const { repositories: { verifyOTP } } = dependencies;

  return {
    execute: async (email: string, submittedOTP: string): Promise<boolean> => {
      try {
        return await verifyOTP(email, submittedOTP);
      } catch (error: any) {
        throw new Error(error?.message);
      }
    }
  };
};
