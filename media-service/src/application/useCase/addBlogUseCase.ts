import { IDependencies } from "../../application/interface/IDependencies";
import { BlogEntity} from "../../domain/entities";

export const addBlogUseCase = (dependencies: IDependencies) => {
    const { repositories: { addBlogRepo } } = dependencies;
        
    return {
        execute: async (data: BlogEntity)=> {
            try {
                const Response = await addBlogRepo(data);
                return Response;
            } catch (error) {
                throw new Error((error as Error)?.message || "Error in adding blog");
            }
        }
    };
};
