import { Category, Channel } from "@prisma/client";

export interface GetUserDto {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  accessToken?: string;
  channels?: Array<Channel>;
  subscribed?: Array<Category>;
}
