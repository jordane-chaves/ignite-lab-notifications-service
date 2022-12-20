import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

let getRecipientNotifications: GetRecipientNotifications;

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;

describe('Get recipient notifications', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();

    getRecipientNotifications = new GetRecipientNotifications(
      inMemoryNotificationsRepository,
    );
  });

  it('should be able to get recipient notifications', async () => {
    await inMemoryNotificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await inMemoryNotificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await inMemoryNotificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
