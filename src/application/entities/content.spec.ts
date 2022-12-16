import { Content } from './content';

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    expect(() => {
      new Content('Você tem um novo seguidor');
    }).not.toThrow();
  });

  it('should not be able to create a notification content with less than 5 characters', () => {
    expect.assertions(1);

    try {
      new Content('Four');
    } catch (error) {
      expect(error).toHaveProperty('message', 'Content length is not valid');
    }
  });

  it('should not be able to create a notification content with more than 240 characters', () => {
    expect.assertions(1);

    try {
      new Content('N'.repeat(241));
    } catch (error) {
      expect(error).toHaveProperty('message', 'Content length is not valid');
    }
  });
});
