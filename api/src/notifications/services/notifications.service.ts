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
  async create(resource: CreateNotificationDto): Promise<void> {
    const channels = await channelsDao.getChannels();
    for (const channel of channels) {
      switch (channel?.name) {
        case "SMS":
          await smsHandlerService.send(resource, channel.id);
          break;

        case "E-mail":
          await emailHandlerService.send(resource, channel.id);
          break;

        case "Push Notification":
          await pushHandlerService.send(resource, channel.id);
          break;
      }
    }
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
