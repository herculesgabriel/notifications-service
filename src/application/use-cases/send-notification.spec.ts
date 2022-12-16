import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  it('should return a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      recipient_id: 'recipient-id',
      content: 'Novo conteúdo publicado',
      category: 'video',
    });

    expect(notification).toStrictEqual(
      expect.objectContaining({
        recipientId: 'recipient-id',
        category: 'video',
        content: {
          content: 'Novo conteúdo publicado',
        },
      }),
    );
  });

  it('should be able to persist the created notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    await sendNotification.execute({
      recipient_id: 'recipient-id',
      content: 'Novo conteúdo publicado',
      category: 'video',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          props: expect.objectContaining({
            category: 'video',
            recipientId: 'recipient-id',
            content: {
              content: 'Novo conteúdo publicado',
            },
            createdAt: expect.any(Date),
          }),
        }),
      ]),
    );
  });
});
