import { Notification } from "@prisma/client";

import { CRUD } from "@app/common/interfaces/crud.interface";

import notificationsDao from "@app/notifications/daos/notifications.dao";
import { CreateNotificationDto } from "@app/notifications/dtos/create.notification.dto";
import { GetNotificationDto } from "../dtos/get.notification.dto";
import { ListNotificationsDto } from "../dtos/list.notifications.dto";
import { PutNotificationDto } from "../dtos/put.notification.dto";
import channelsDao from "@app/channels/daos/channels.dao";
import smsHandlerService from "./handlers/sms.handler.service";
import emailHandlerService from "./handlers/email.handler.service";
import pushHandlerService from "./handlers/push.handler.service";

class NotificationsService implements Omit<CRUD, "list"> {
  async create(
    resource: CreateNotificationDto
  ): Promise<Notification | undefined> {
    const channels = await channelsDao.getChannels();
    const channel = channels.find((ch) => ch.id === resource.channel);

    switch (channel?.name) {
      case "SMS":
        smsHandlerService.send(resource);
        break;

      case "Email":
        emailHandlerService.send(resource);
        break;

      case "Push Notification":
        pushHandlerService.send(resource);
        break;
    }

    return notificationsDao.addNotification(resource);
  }

  async deleteById(id: number): Promise<Notification> {
    return notificationsDao.removeNotification(id);
  }

  async list(
    categories: Array<number>,
    channels: Array<number>,
    limit?: number,
    page?: number
  ): Promise<ListNotificationsDto> {
    return notificationsDao.getNotifications(categories, channels, limit, page);
  }

  async readById(id: number): Promise<GetNotificationDto | null> {
    return notificationsDao.getNotification(id);
  }

  async putById(
    id: number,
    resource: PutNotificationDto
  ): Promise<Notification> {
    return notificationsDao.updateNotification(id, resource);
  }
}

export default new NotificationsService();
