import { IGetUserUseCase } from "../../domain/useCaseInterface";
import { ICompleteProfileUseCase } from "../../domain/useCaseInterface";
import { ISaveUserUseCase } from "../../domain/useCaseInterface";
import { IDependencies } from "./IDependencies";

export interface IUseCases {
    saveUserUseCase: (dependencies: IDependencies) => ISaveUserUseCase;
    completeProfileUseCase: (dependencies: IDependencies) => ICompleteProfileUseCase;
    fetchUser: (dependencies: IDependencies) => IGetUserUseCase;
    
}
