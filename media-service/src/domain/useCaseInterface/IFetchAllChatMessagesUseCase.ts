
import { ChatMessageEntity } from "../entities";

export interface IFetchAllChatMessageUseCase {
  execute(query:string): Promise<ChatMessageEntity[] | null>;
}
