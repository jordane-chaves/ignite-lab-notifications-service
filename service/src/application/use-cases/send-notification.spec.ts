import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

let sendNotification: SendNotification;

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;

describe('Send notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();

    sendNotification = new SendNotification(inMemoryNotificationsRepository);
  });

  it('should be able to send a notification', async () => {
    const { notification } = await sendNotification.execute({
      content: 'This is a notification',
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(inMemoryNotificationsRepository.notifications).toHaveLength(1);
    expect(inMemoryNotificationsRepository.notifications[0]).toEqual(
      notification,
    );
  });
});
