import { GetNotificationDto } from "./get.notification.dto";

export interface ListNotificationsDto {
  notifications: Array<GetNotificationDto>;
  totalCount: number;
}
