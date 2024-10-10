import { IUseCases } from "./IUsecases";
import { IRepositories } from "./IRepositories";

export interface IDependencies {
  useCases: IUseCases;
  repositories: IRepositories;
}
