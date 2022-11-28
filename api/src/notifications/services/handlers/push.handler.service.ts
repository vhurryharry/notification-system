import { CreateNotificationDto } from "@app/notifications/dtos/create.notification.dto";

class PushNotificationHandlerService {
  send(resource: CreateNotificationDto) {}
}

export default new PushNotificationHandlerService();
