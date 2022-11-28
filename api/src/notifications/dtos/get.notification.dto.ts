import { Category, Channel } from "@prisma/client";

export interface GetNotificationDto {
  content: string;
  createdAt: Date;
  category: Category;
  channel: Channel;
}
