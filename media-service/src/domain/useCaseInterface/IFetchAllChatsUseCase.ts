import { ChatEntity } from "../entities/chatEntity";

export interface IFetchAllChatsUseCase {
  execute(): Promise<ChatEntity[] | null>;
}
