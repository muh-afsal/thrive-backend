import { ILoginUserUseCase, ISignupUserUseCase,IFindUserByEmailUseCase,IOtpUseCase  } from "../../domain/useCaseInterface/index.js";
import { IDependencies } from "./IDependencies.js";

export interface IUseCases {
    signupUserUseCase: (dependencies: IDependencies) => ISignupUserUseCase;
    loginUserUseCase: (dependencies: IDependencies) => ILoginUserUseCase;
    findUserByEmailUseCase: (dependencies: IDependencies) => IFindUserByEmailUseCase;
}