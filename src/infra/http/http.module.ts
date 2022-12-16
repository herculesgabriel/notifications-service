import { Module } from '@nestjs/common';

import { SendNotification } from '@use-cases/send-notification';
import { CancelNotification } from '@use-cases/cancel-notification';
import { ReadNotification } from '@use-cases/read-notification';
import { UnreadNotification } from '@use-cases/unread-notification';
import { CountRecipientNotifications } from '@use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@use-cases/get-recipient-notifications';
import { ListNotifications } from '@use-cases/list-notifications';

import { DatabaseModule } from '@database/database.module';
import { NotificationsController } from '@controllers/notifications.controller';

@Module({
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
})
export class HttpModule {}
