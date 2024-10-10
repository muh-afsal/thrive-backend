// src/application/interface/IUseCases.ts

import { IGetUserUseCase, IUpdateSubscriptionDetailsUseCase } from "../../domain/useCaseInterface";
import { IDependencies } from "./IDependencies";

export interface IUseCases {
    fetchUser: (dependencies: IDependencies) => IGetUserUseCase;
    updateSubscriptionDetailsUseCase: (dependencies: IDependencies) => IUpdateSubscriptionDetailsUseCase;
}
