import { userSchemaEntity } from "../entities";

export interface ICompleteProfileUseCase {
  execute(data: userSchemaEntity): Promise<userSchemaEntity | null>;
}
