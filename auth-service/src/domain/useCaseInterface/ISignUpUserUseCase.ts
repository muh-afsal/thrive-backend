import { userSchemaEntity } from "../entities";

export interface ISignupUserUseCase {
  execute(user: userSchemaEntity): Promise<userSchemaEntity | null>;
}
