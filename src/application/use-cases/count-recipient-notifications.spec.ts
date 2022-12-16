import { makeNotification } from '@test/factories/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';

import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to count all notification for recipient', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await Promise.all([
      notificationsRepository.create(
        makeNotification({ recipientId: 'recipient-id-1' }),
      ),
      notificationsRepository.create(
        makeNotification({ recipientId: 'recipient-id-1' }),
      ),
      notificationsRepository.create(
        makeNotification({ recipientId: 'recipient-id-2' }),
      ),
    ]);

    const { count } = await countNotifications.execute({
      recipient_id: 'recipient-id-1',
    });

    expect(count).toBe(2);
  });
});
