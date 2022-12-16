import { makeNotification } from '@test/factories/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotification.execute({ notification_id: notification.id });

    expect(notificationsRepository.notifications[0].canceledAt).toStrictEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a nonexisting notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect.assertions(2);

    try {
      await cancelNotification.execute({
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
