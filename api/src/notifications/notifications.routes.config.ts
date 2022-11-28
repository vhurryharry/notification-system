import { CommonRoutesConfig } from "@app/common/common.routes.config";
import notificationsController from "@app/notifications/controllers/notifications.controller";
import notificationsMiddleware from "@app/notifications/middleware/notifications.middleware";
import express from "express";

export class NotificationsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "notificationsRoutes");
  }

  configureRoutes() {
    this.app
      .route(`/notifications`)
      .get(
        notificationsMiddleware.extractPaginationParameters,
        notificationsController.listNotifications
      )
      .post(
        notificationsMiddleware.validateRequiredNotificationBodyFields,
        notificationsMiddleware.validateCategoryExists,
        notificationsMiddleware.validateChannelExists,
        notificationsController.createNotification
      );

    this.app.param(
      `notificationId`,
      notificationsMiddleware.extractNotificationId
    );
    this.app
      .route(`/notifications/:notificationId`)
      .all(notificationsMiddleware.validateNotificationExists)
      .get(notificationsController.getNotificationById)
      .delete(notificationsController.removeNotification);

    return this.app;
  }
}
