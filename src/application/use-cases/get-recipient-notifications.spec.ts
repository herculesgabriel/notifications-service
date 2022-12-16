import { makeNotification } from '@test/factories/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';

import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipient notifications', () => {
  it('should be able to count all notification for recipient', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipient_id: 'recipient-id-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-id-1' }),
        expect.objectContaining({ recipientId: 'recipient-id-1' }),
      ]),
    );
  });
});
