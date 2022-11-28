import { Notification } from "@prisma/client";

import { CRUD } from "@app/common/interfaces/crud.interface";

import notificationsDao from "@app/notifications/daos/notifications.dao";
import { CreateNotificationDto } from "@app/notifications/dtos/create.notification.dto";
import { GetNotificationDto } from "../dtos/get.notification.dto";
import { ListNotificationsDto } from "../dtos/list.notifications.dto";
import { PutNotificationDto } from "../dtos/put.notification.dto";

class NotificationsService implements Omit<CRUD, "list"> {
  async create(resource: CreateNotificationDto): Promise<Notification> {
    return notificationsDao.addNotification(resource);
  }

  async deleteById(id: number): Promise<Notification> {
    return notificationsDao.removeNotification(id);
  }

  async list(
    category: number,
    channel: number,
    limit: number,
    page: number
  ): Promise<ListNotificationsDto> {
    return await notificationsDao.getNotifications(
      category,
      channel,
      limit,
      page
    );
  }

  async readById(id: number): Promise<GetNotificationDto | null> {
    return await notificationsDao.getNotification(id);
  }

  async putById(
    id: number,
    resource: PutNotificationDto
  ): Promise<Notification> {
    return notificationsDao.updateNotification(id, resource);
  }
}

export default new NotificationsService();
