import { Test, TestingModule } from '@nestjs/testing';

import { SendNotification } from '@use-cases/send-notification';
import { CancelNotification } from '@use-cases/cancel-notification';
import { ReadNotification } from '@use-cases/read-notification';
import { UnreadNotification } from '@use-cases/unread-notification';
import { CountRecipientNotifications } from '@use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@use-cases/get-recipient-notifications';
import { ListNotifications } from '@use-cases/list-notifications';

import { NotificationsController } from '@controllers/notifications.controller';
import { DatabaseModule } from '@database/database.module';

describe('AppController', () => {
  let notificationsController: NotificationsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [NotificationsController],
      providers: [
        SendNotification,
        CancelNotification,
        ReadNotification,
        UnreadNotification,
        CountRecipientNotifications,
        GetRecipientNotifications,
        ListNotifications,
      ],
    }).compile();

    notificationsController = app.get<NotificationsController>(
      NotificationsController,
    );
  });

  describe('Notifications controller', () => {
    it('should create a notification', async () => {
      const { notification } = await notificationsController.create({
        category: 'some-category',
        content: 'Some content',
        recipient_id: 'some-recipient-id',
      });

      expect(notification).toStrictEqual(
        expect.objectContaining({
          category: 'some-category',
          recipient_id: 'some-recipient-id',
        }),
      );
    });
  });
});
