import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { SendNotification } from '@use-cases/send-notification';
import { CancelNotification } from '@use-cases/cancel-notification';
import { ReadNotification } from '@use-cases/read-notification';
import { UnreadNotification } from '@use-cases/unread-notification';
import { CountRecipientNotifications } from '@use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@use-cases/get-recipient-notifications';
import { ListNotifications } from '@application/use-cases/list-notifications';

import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotifications: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
    private listNotifications: ListNotifications,
  ) {}

  @Get('count/by/:recipientId')
  async countByRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipient_id: recipientId,
    });

    return { count };
  }

  @Get('by/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipient_id: recipientId,
    });

    return { notifications: notifications.map(NotificationViewModel.toHTTP) };
  }

  @Get()
  async list() {
    const { notifications } = await this.listNotifications.execute();

    return { notifications: notifications.map(NotificationViewModel.toHTTP) };
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notification_id: id });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notification_id: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notification_id: id });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { notification } = await this.sendNotifications.execute(body);

    return { notification: NotificationViewModel.toHTTP(notification) };
  }
}
