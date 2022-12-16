import { makeNotification } from '@test/factories/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

import { ReadNotification } from './read-notification';

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = makeNotification();
    await notificationsRepository.create(notification);

    await readNotification.execute({ notification_id: notification.id });

    expect(notificationsRepository.notifications[0]).toHaveProperty(
      'readAt',
      expect.any(Date),
    );
  });

  it('should not be able to read a nonexisting notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    expect.assertions(2);

    try {
      await readNotification.execute({
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
