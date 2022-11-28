import notificationsDao from "@app/notifications/daos/notifications.dao";
import { CreateNotificationDto } from "@app/notifications/dtos/create.notification.dto";
import usersDao from "@app/users/daos/users.dao";

class SmsHandlerService {
  async send(resource: CreateNotificationDto, channel: number) {
    const users = await usersDao.getUsers(resource.category, channel);

    return notificationsDao.addNotification(
      {
        ...resource,
        channel,
      },
      users
    );
  }
}

export default new SmsHandlerService();
