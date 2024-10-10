import { ChatEntity } from "../entities/chatEntity";

export interface ICreateAChatUseCase {
  execute(data:ChatEntity): Promise<ChatEntity | null>;
}
