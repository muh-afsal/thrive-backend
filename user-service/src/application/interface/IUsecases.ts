// src/application/interface/IUseCases.ts

import { IGetUserUseCase, ICompleteProfileUseCase, ISaveUserUseCase, IUpdateSubscriptionDetailsUseCase } from "../../domain/useCaseInterface";
import { IDependencies } from "./IDependencies";

export interface IUseCases {
    saveUserUseCase: (dependencies: IDependencies) => ISaveUserUseCase;
    completeProfileUseCase: (dependencies: IDependencies) => ICompleteProfileUseCase;
    fetchUser: (dependencies: IDependencies) => IGetUserUseCase;
    updateSubscriptionDetailsUseCase: (dependencies: IDependencies) => IUpdateSubscriptionDetailsUseCase;
}
