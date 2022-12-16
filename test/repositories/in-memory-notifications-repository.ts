import { Notification } from '@entities/notification';
import { NotificationsRepository } from '@repositories/notifications-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async findById(notificationId: string): Promise<Notification | null> {
    return (
      this.notifications.find(
        (notification) => notification.id === notificationId,
      ) || null
    );
  }

  async findAll(): Promise<Notification[]> {
    return this.notifications;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );
  }

  async save(notification: Notification): Promise<void> {
    const foundIndex = this.notifications.findIndex(
      ({ id }) => id === notification.id,
    );

    if (foundIndex > 0) {
      this.notifications[foundIndex] = notification;
    }
  }

  async countByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    ).length;
  }
}
