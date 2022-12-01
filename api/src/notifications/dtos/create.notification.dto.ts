export interface CreateNotificationDto {
  message: string;
  category: number;
  channel?: number;
}
