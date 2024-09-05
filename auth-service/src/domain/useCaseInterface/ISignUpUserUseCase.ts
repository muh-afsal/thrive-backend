import { authSignUpEntity } from "../entities";

export interface ISignupUserUseCase {
  execute(user: authSignUpEntity): Promise<authSignUpEntity | null>;
}
