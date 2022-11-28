import { Category, Channel } from "@prisma/client";

export interface GetNotificationDto {
  content: string;
  sentAt: Date;
  category: Category;
  channel: Channel;
}
