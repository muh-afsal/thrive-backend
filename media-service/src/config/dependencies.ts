import * as repositories from "../infrastructure/database/mongodb/repositories"
import {IDependencies} from "../application/interface/IDependencies"
import * as useCases from "../application/useCase"


export const dependencies:IDependencies={
    useCases,
    repositories
}

