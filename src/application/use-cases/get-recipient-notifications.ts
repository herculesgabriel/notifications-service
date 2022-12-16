import { Injectable } from '@nestjs/common';

import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@repositories/notifications-repository';

interface Params {
  recipient_id: string;
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipient_id,
  }: Params): Promise<{ notifications: Notification[] }> {
    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipient_id);

    return { notifications };
  }
}
