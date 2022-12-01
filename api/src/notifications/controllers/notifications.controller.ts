import express from "express";
import notificationsService from "@app/notifications/services/notifications.service";

class NotificationsController {
  async listNotifications(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const notifications = await notificationsService.list(
        req.body.categories,
        req.body.channels,
        req.body.limit,
        req.body.page
      );
      res.status(200).send(notifications);
    } catch (e) {
      next(e);
    }
  }

  async getNotificationById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const notification = await notificationsService.readById(req.body.id);
      res.status(200).send(notification);
    } catch (e) {
      next(e);
    }
  }

  async createNotification(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      await notificationsService.create(req.body);
      res.status(201).send();
    } catch (e) {
      next(e);
    }
  }

  async put(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      await notificationsService.putById(req.body.id, req.body);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }

  async removeNotification(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      await notificationsService.deleteById(req.body.id);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }
}

export default new NotificationsController();
