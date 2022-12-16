import { makeNotification } from '@test/factories/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';

import { ListNotifications } from './list-notifications';

describe('List notifications', () => {
  it('should be able to list all notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const listNotifications = new ListNotifications(notificationsRepository);

    const notification1 = makeNotification({ recipientId: 'recipient-id-1' });
    const notification2 = makeNotification({ recipientId: 'recipient-id-1' });
    const notification3 = makeNotification({ recipientId: 'recipient-id-2' });

    await Promise.all([
      notificationsRepository.create(notification1),
      notificationsRepository.create(notification2),
      notificationsRepository.create(notification3),
    ]);

    const { notifications } = await listNotifications.execute();

    expect(notifications).toHaveLength(3);
    expect(notifications).toStrictEqual(
      expect.arrayContaining([notification1, notification2, notification3]),
    );
  });
});
