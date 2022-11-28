import { PrismaClient, Notification } from "@prisma/client";
import { getPrisma } from "@app/database";

import { CreateNotificationDto } from "@app/notifications/dtos/create.notification.dto";
import { GetNotificationDto } from "../dtos/get.notification.dto";
import { ListNotificationsDto } from "../dtos/list.notifications.dto";
import { PutNotificationDto } from "../dtos/put.notification.dto";

class NotificationsDao {
  prisma: PrismaClient;

  constructor() {
    this.prisma = getPrisma();
  }

  async addNotification(
    notification: CreateNotificationDto
  ): Promise<Notification> {
    const result = await this.prisma.notification.create({
      data: {
        content: notification.content,
        createdAt: new Date(),
        category: {
          connect: {
            id: notification.category,
          },
        },
        channel: {
          connect: {
            id: notification.channel,
          },
        },
      },
    });

    return result;
  }

  async getNotifications(
    category: number,
    channel: number,
    limit: number,
    page: number
  ): Promise<ListNotificationsDto> {
    const result = await this.prisma.notification.findMany({
      where: {
        categoryId: category,
        channelId: channel,
      },
      include: {
        category: true,
        channel: true,
      },
      skip: limit * page,
      take: limit,
    });

    const count = await this.prisma.notification.count({
      where: {
        categoryId: category,
        channelId: channel,
      },
    });

    return {
      totalCount: count,
      notifications: result,
    };
  }

  async getNotification(id: number): Promise<GetNotificationDto | null> {
    const result = await this.prisma.notification.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        channel: true,
      },
    });

    return result;
  }

  async removeNotification(id: number): Promise<Notification> {
    const result = await this.prisma.notification.delete({
      where: {
        id,
      },
    });

    return result;
  }

  async updateNotification(
    id: number,
    notification: PutNotificationDto
  ): Promise<Notification> {
    const result = await this.prisma.notification.update({
      where: {
        id,
      },
      data: {
        content: notification.content,
        category: {
          connect: {
            id: notification.category,
          },
        },
        channel: {
          connect: {
            id: notification.channel,
          },
        },
      },
    });

    return result;
  }
}

export default new NotificationsDao();
