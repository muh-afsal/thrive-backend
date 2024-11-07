import { EventEntity } from "../entities/eventEntity";


export interface IEditEventUseCase {
  execute(eventId: string, data: Partial<EventEntity>): Promise<EventEntity |null>;
}
