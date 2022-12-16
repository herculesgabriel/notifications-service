import { Notification } from '@entities/notification';

export class NotificationViewModel {
  static toHTTP(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      recipient_id: notification.recipientId,
      category: notification.category,
    };
  }
}
