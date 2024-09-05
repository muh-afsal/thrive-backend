import { OTPEntity } from "../entities";

export interface IOtpUseCase {
    generateOTP(): string;
    saveOTP(email: string, otp: string): Promise<void>;
    verifyOTP(email: string, submittedOTP: string): Promise<boolean>;
}
