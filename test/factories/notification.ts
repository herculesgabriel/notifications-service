import { Content } from '@entities/content';
import { Notification, NotificationProps } from '@entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    props: {
      recipientId: 'recipient-id',
      content: new Content('Novo conteúdo publicado'),
      category: 'video',
      ...override,
    },
  });
}
