import { INotificationRepository } from "../../domain/useCaseInterface/INotificationUseCase";
import { Notification } from "../../domain/entities/notification";

export class SendNotificationUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(notification: Notification): Promise<void> {
    await this.notificationRepository.sendNotification(notification);
  }
}
