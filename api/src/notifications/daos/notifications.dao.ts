import { PrismaClient, Notification, User } from "@prisma/client";
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
    notification: CreateNotificationDto,
    users: Array<User>
  ): Promise<Notification> {
    const result = await this.prisma.notification.create({
      data: {
        message: notification.message,
        sentAt: new Date(),
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

    // Unfortunately prisma's `createMany` method is not supported in SQLite now
    for (const user of users) {
      await this.prisma.notificationsForUsers.create({
        data: {
          userId: user.id,
          notificationId: result.id,
          readByUser: false,
        },
      });
    }

    return result;
  }

  async getNotifications(
    categories: Array<number>,
    channels: Array<number>,
    limit?: number,
    page?: number
  ): Promise<ListNotificationsDto> {
    const result = await this.prisma.notification.findMany({
      where: {
        categoryId: { in: categories },
        channelId: { in: channels },
      },
      include: {
        category: true,
        channel: true,
      },
      skip: limit && page ? limit * page : 0,
      take: limit,
      orderBy: {
        sentAt: "desc",
      },
    });

    const count = await this.prisma.notification.count({
      where: {
        categoryId: { in: categories },
        channelId: { in: channels },
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
        message: notification.message,
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
