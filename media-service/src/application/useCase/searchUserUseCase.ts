import { IDependencies } from "../../application/interface/IDependencies";
import { userSchemaEntity } from "../../domain/entities";

export const searchUserUseCase = (dependencies: IDependencies) => {
  const { repositories: { searchUsers } } = dependencies;

  return {
    execute: async (query: string): Promise<userSchemaEntity[] | null> => {
      try {
        const users = await searchUsers(query);
        return users;
      } catch (error: any) {
        throw new Error(error?.message || "Error searching users");
      }
    }
  };
};
