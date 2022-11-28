export interface CreateNotificationDto {
  content: string;
  category: number;
  channel?: number;
}
