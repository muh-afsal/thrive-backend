import { ICompleteProfileUseCase } from "../../domain/useCaseInterface/ICompleteProfileUseCase.js";
import { IGetUserUseCase } from "../../domain/useCaseInterface/IGetUserUseCase.js";
import { ILoginUserUseCase, ISignupUserUseCase,IFindUserByEmailUseCase,IOtpUseCase,  } from "../../domain/useCaseInterface/index.js";
import { ISaveUserUseCase } from "../../domain/useCaseInterface/ISaveUserUseCase.js";
import { IDependencies } from "./IDependencies.js";

export interface IUseCases {
    signupUserUseCase: (dependencies: IDependencies) => ISignupUserUseCase;
    loginUserUseCase: (dependencies: IDependencies) => ILoginUserUseCase;
    findUserByEmailUseCase: (dependencies: IDependencies) => IFindUserByEmailUseCase;
    saveUserUseCase: (dependencies: IDependencies) => ISaveUserUseCase;
    completeProfileUseCase: (dependencies: IDependencies) => ICompleteProfileUseCase;
    fetchUser: (dependencies: IDependencies) => IGetUserUseCase;
}