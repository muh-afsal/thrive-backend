import { BlogEntity } from "../entities";

export interface IAddBlogUseCase {
  execute(data:BlogEntity): Promise<BlogEntity | null>;
}
