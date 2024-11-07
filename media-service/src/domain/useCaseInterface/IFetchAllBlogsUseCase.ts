import { BlogEntity } from "../entities";

export interface IFetchAllBlogsUseCase {
  execute(): Promise<BlogEntity[] | null>;
}
