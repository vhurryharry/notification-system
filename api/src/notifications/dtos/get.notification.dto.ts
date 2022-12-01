import { Category, Channel } from "@prisma/client";

export interface GetNotificationDto {
  message: string;
  sentAt: Date;
  category: Category;
  channel: Channel;
}
