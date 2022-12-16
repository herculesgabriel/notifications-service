import { Notification as RawNotification } from '@prisma/client';

import { Content } from '@entities/content';
import { Notification } from '@entities/notification';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      createdAt: notification.createdAt,
      canceledAt: notification.canceledAt,
      readAt: notification.readAt,
    };
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification({
      id: raw.id,
      props: {
        category: raw.category,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        readAt: raw.readAt,
        canceledAt: raw.canceledAt,
        createdAt: raw.createdAt,
      },
    });
  }
}
