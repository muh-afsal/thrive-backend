import { userSchemaEntity } from "../entities";

export interface IGetUserUseCase {
  execute(id: string): Promise<userSchemaEntity | null>;
}
