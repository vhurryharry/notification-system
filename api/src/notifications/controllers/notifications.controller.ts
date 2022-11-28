import express from "express";
import notificationsService from "@app/notifications/services/notifications.service";

class NotificationsController {
  async listNotifications(req: express.Request, res: express.Response) {
    const notifications = await notificationsService.list(
      req.body.categories,
      req.body.channels,
      req.body.limit,
      req.body.page
    );
    res.status(200).send(notifications);
  }

  async getNotificationById(req: express.Request, res: express.Response) {
    const notification = await notificationsService.readById(req.body.id);
    res.status(200).send(notification);
  }

  async createNotification(req: express.Request, res: express.Response) {
    const notificationId = await notificationsService.create(req.body);
    res.status(201).send({ id: notificationId });
  }

  async put(req: express.Request, res: express.Response) {
    await notificationsService.putById(req.body.id, req.body);
    res.status(204).send();
  }

  async removeNotification(req: express.Request, res: express.Response) {
    await notificationsService.deleteById(req.body.id);
    res.status(204).send();
  }
}

export default new NotificationsController();
