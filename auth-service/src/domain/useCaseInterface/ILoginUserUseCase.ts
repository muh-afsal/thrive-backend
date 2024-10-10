import { userSchemaEntity } from "../entities";
import { authLoginEntity } from "../entities";

export interface ILoginUserUseCase{
    execute(data: authLoginEntity): Promise<userSchemaEntity | null>
}