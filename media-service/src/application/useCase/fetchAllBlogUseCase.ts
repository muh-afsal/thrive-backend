import { IDependencies } from "../../application/interface/IDependencies";
import { BlogEntity } from "../../domain/entities";

export const fetchAllBlogUseCase = (dependencies: IDependencies) => {
  const { repositories: { fetchAllBlogs } } = dependencies;

  return {
    execute: async (): Promise<BlogEntity[] | null> => {
      try {
        const allBlogs = await fetchAllBlogs();
        return allBlogs;
      } catch (error: any) {
        throw new Error(error?.message || "Error fetching the blogs");
      }
    }
  };
};
