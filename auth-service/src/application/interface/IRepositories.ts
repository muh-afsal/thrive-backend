import { authLoginEntity, authSignUpEntity } from "../../domain/entities";

export interface IRepositories {
    signup: (data: authSignUpEntity) => Promise<authSignUpEntity | null>;
    login: (data: authLoginEntity) => Promise<authSignUpEntity | null>;
    findByEmail: (data: string) => Promise<authSignUpEntity | null>;
    saveOTP: (email: string, otp: string) => Promise<void>;
    verifyOTP: (email: string, submittedOTP: string) => Promise<boolean>;
}
