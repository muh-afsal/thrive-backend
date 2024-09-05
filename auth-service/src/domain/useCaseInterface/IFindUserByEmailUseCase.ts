import {authSignUpEntity} from "../entities/authSignupEntity";


export interface IFindUserByEmailUseCase{
    execute(email:string):Promise< authSignUpEntity| null>
}