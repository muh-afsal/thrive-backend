import { authLoginEntity, userSchemaEntity } from "../../domain/entities";

export interface IRepositories {
    signup: (data: userSchemaEntity) => Promise<userSchemaEntity | null>;
    login: (data: authLoginEntity) => Promise<userSchemaEntity | null>;
    findByEmail: (data: string) => Promise<userSchemaEntity | null>;
    saveOTP: (email: string, otp: string) => Promise<void>;
    verifyOTP: (email: string, submittedOTP: string) => Promise<boolean>;
    saveUserToDatabase: (data: userSchemaEntity) => Promise<userSchemaEntity | null>;
    completeProfile: (data: userSchemaEntity) => Promise<userSchemaEntity | null>;
    getUserById: (id: string) => Promise<userSchemaEntity | null>;
}
