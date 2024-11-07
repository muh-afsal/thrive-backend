
import { ChatEntity } from "../entities/chatEntity";

export interface IFetchAllChatsUseCase {
  execute(userId:string): Promise<ChatEntity[] | null>;
}
