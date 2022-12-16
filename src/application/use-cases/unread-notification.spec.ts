import { makeNotification } from '@test/factories/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({ readAt: new Date() });
    await notificationsRepository.create(notification);

    await unreadNotification.execute({ notification_id: notification.id });

    expect(notificationsRepository.notifications[0]).toHaveProperty(
      'readAt',
      null,
    );
  });

  it('should not be able to unread a nonexisting notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect.assertions(2);

    try {
      await unreadNotification.execute({
        notification_id: 'nonexisting-notification',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(NotificationNotFound);
      expect(error).toHaveProperty(
        'message',
        new NotificationNotFound().message,
      );
    }
  });
});
