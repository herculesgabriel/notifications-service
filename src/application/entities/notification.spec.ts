import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    expect(() => {
      new Notification({
        props: {
          recipientId: 'recipient-id',
          content: new Content('Novo conteúdo publicado'),
          category: 'video',
        },
      });
    }).not.toThrow();
  });
});
