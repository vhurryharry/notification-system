import { CommonRoutesConfig } from "@app/common/common.routes.config";
import authMiddleware from "@app/common/middleware/auth.middleware";
import usersController from "@app/users/controllers/users.controller";
import usersMiddleware from "@app/users/middleware/users.middleware";
import express from "express";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes() {
    this.app
      .route(`/login`)
      .post(
        usersMiddleware.validateRequiredUserBodyFields,
        usersController.login
      );

    this.app.param(`userId`, usersMiddleware.extractUserId);
    this.app
      .route("/:userId/notifications")
      .get(authMiddleware.auth, usersController.getNotifications);

    return this.app;
  }
}
