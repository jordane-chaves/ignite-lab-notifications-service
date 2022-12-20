import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

let countRecipientNotifications: CountRecipientNotifications;

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;

describe('Count recipient notifications', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();

    countRecipientNotifications = new CountRecipientNotifications(
      inMemoryNotificationsRepository,
    );
  });

  it('should be able to count recipient notifications', async () => {
    await inMemoryNotificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await inMemoryNotificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await inMemoryNotificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
