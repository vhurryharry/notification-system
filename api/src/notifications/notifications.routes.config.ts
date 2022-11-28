import { CommonRoutesConfig } from "@app/common/common.routes.config";
import eventsController from "@app/notifications/controllers/notifications.controller";
import eventsMiddleware from "@app/notifications/middleware/notifications.middleware";
import express from "express";

export class NotificationsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "notificationsRoutes");
  }

  configureRoutes() {
    this.app
      .route(`/notifications`)
      .get(
        eventsMiddleware.extractPaginationParameters,
        eventsController.listNotifications
      )
      .post(
        eventsMiddleware.validateRequiredNotificationBodyFields,
        eventsController.createNotification
      );

    this.app.param(`notificationId`, eventsMiddleware.extractNotificationId);
    this.app
      .route(`/notifications/:notificationId`)
      .all(eventsMiddleware.validateNotificationExists)
      .get(eventsController.getNotificationById)
      .delete(eventsController.removeNotification);

    return this.app;
  }
}
