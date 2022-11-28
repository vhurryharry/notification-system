import { CreateNotificationDto } from "@app/notifications/dtos/create.notification.dto";

class SmsHandlerService {
  send(resource: CreateNotificationDto) {}
}

export default new SmsHandlerService();
