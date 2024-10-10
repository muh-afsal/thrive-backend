import { userSchemaEntity } from "../entities/userSchemaEntity";

export interface ISearchUserUseCase {
  execute(query: string): Promise<userSchemaEntity[] | null>;
}
