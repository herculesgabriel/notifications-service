import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '@repositories/notifications-repository';

interface Params {
  recipient_id: string;
}

@Injectable()
export class CountRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({ recipient_id }: Params): Promise<{ count: number }> {
    const count = await this.notificationsRepository.countByRecipientId(
      recipient_id,
    );

    return { count };
  }
}
