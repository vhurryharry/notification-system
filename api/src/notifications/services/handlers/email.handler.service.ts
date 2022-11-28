import { CreateNotificationDto } from "@app/notifications/dtos/create.notification.dto";

class EmailHandlerService {
  send(resource: CreateNotificationDto) {}
}

export default new EmailHandlerService();
