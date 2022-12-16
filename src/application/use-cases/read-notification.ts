import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface Params {
  notification_id: string;
}

@Injectable()
export class ReadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({ notification_id }: Params): Promise<void> {
    const notification = await this.notificationsRepository.findById(
      notification_id,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}
