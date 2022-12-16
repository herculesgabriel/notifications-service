import { Injectable } from '@nestjs/common';

import { Content } from '@entities/content';
import { Notification } from '@entities/notification';
import { NotificationsRepository } from '@repositories/notifications-repository';

interface Params {
  recipient_id: string;
  content: string;
  category: string;
}

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(data: Params): Promise<{ notification: Notification }> {
    const notification = new Notification({
      props: {
        recipientId: data.recipient_id,
        category: data.category,
        content: new Content(data.content),
      },
    });

    await this.notificationsRepository.create(notification);

    return { notification };
  }
}
