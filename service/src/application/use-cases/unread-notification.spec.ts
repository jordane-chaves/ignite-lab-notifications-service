import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { UnreadNotification } from './unread-notification';
import { NotificationNotFound } from './errors/notification-not-found';

let unreadNotification: UnreadNotification;

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;

describe('Read notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();

    unreadNotification = new UnreadNotification(
      inMemoryNotificationsRepository,
    );
  });

  it('should be able to unread a notification', async () => {
    const notification = makeNotification({
      readAt: new Date(),
    });

    await inMemoryNotificationsRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(inMemoryNotificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    await expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
