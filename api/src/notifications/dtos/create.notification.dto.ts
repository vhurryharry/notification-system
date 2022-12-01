import { User } from "@prisma/client";

export interface CreateNotificationDto {
  message: string;
  category: number;
  user: User;
  channel?: number;
}
