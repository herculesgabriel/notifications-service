import { Injectable } from '@nestjs/common';

import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@repositories/notifications-repository';

@Injectable()
export class ListNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(): Promise<{ notifications: Notification[] }> {
    const notifications = await this.notificationsRepository.findAll();

    return { notifications };
  }
}
