import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface Params {
  notification_id: string;
}

@Injectable()
export class UnreadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({ notification_id }: Params): Promise<void> {
    const notification = await this.notificationsRepository.findById(
      notification_id,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}
