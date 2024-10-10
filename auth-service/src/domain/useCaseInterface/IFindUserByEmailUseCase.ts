import {userSchemaEntity} from "../entities/userSchemaEntity";


export interface IFindUserByEmailUseCase{
    execute(email:string):Promise< userSchemaEntity| null>
}