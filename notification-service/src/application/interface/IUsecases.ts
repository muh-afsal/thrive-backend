
import { ISaveNotificationUseCase } from "../../domain/useCaseInterface/ISaveNotificationUseCase";
import { IDependencies } from "./IDependencies";
export interface IUseCases {
    saveNotificationUseCase: (dependencies: IDependencies) => ISaveNotificationUseCase;
}
