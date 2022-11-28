import { Notification, User } from "@prisma/client";

export interface GetCategoryDto {
  id: number;
  name: string;
  users?: Array<User>;
  notifications?: Array<Notification>;
}
