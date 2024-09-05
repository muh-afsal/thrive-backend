import { userSchemaEntity } from "../../domain/entities";

export interface IRepositories {
    saveUserToDatabase: (data: userSchemaEntity) => Promise<userSchemaEntity | null>;
    completeProfile: (data: userSchemaEntity) => Promise<userSchemaEntity | null>;
    getUserById: (id: string) => Promise<userSchemaEntity | null>;
}
