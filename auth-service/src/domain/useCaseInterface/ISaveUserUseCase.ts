import { userSchemaEntity } from "../entities";

export interface ISaveUserUseCase {
  execute(user: userSchemaEntity): Promise<userSchemaEntity | null>;
}
