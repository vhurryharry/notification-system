import express from "express";
import notificationsService from "@app/notifications/services/notifications.service";

class NotificationsController {
  async listNotifications(req: express.Request, res: express.Response) {
    const events = await notificationsService.list(
      req.body.category,
      req.body.channel,
      req.body.limit,
      req.body.page
    );
    res.status(200).send(events);
  }

  async getNotificationById(req: express.Request, res: express.Response) {
    const event = await notificationsService.readById(req.body.id);
    res.status(200).send(event);
  }

  async createNotification(req: express.Request, res: express.Response) {
    const eventId = await notificationsService.create(req.body);
    res.status(201).send({ id: eventId });
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
