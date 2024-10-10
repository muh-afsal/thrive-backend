import { ChatMessageEntity } from "../entities";


export interface ISendChatMessageUseCase {
  execute(data: ChatMessageEntity): Promise<ChatMessageEntity | null>;
}
