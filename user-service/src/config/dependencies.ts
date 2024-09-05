import * as repositories from "../infrastructure/database/mongodb/repositories/index"
import {IDependencies} from "../application/interface/IDependencies"
import * as useCases from "../application/useCase"


export const dependencies:IDependencies={
    useCases,
    repositories
}

