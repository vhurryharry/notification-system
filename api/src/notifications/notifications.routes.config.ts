import { CommonRoutesConfig } from "@app/common/common.routes.config";
import authMiddleware from "@app/common/middleware/auth.middleware";
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
        authMiddleware.auth,
        notificationsMiddleware.extractPaginationParameters,
        notificationsController.listNotifications
      )
      .post(
        authMiddleware.auth,
        notificationsMiddleware.validateRequiredNotificationBodyFields,
        notificationsMiddleware.validateCategoryExists,
        notificationsController.createNotification
      );

    this.app.param(
      `notificationId`,
      notificationsMiddleware.extractNotificationId
    );
    this.app
      .route(`/notifications/:notificationId`)
      .all(
        authMiddleware.auth,
        notificationsMiddleware.validateNotificationExists
      )
      .get(notificationsController.getNotificationById)
      .delete(notificationsController.removeNotification);

    return this.app;
  }
}
