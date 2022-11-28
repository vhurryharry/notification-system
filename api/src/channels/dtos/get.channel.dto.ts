import { Notification, User } from "@prisma/client";

export interface GetChannelDto {
  id: number;
  name: string;
  users?: Array<User>;
  notifications?: Array<Notification>;
}
