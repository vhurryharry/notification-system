import { Category, Channel, User } from "@prisma/client";

export interface GetNotificationDto {
  message: string;
  sentAt: Date;
  sender: {
    name: string;
  };
  category: Category;
  channel: Channel;
}
