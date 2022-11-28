import { CommonRoutesConfig } from "@app/common/common.routes.config";
import usersController from "@app/users/controllers/users.controller";
import usersMiddleware from "@app/users/middleware/users.middleware";
import express from "express";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes() {
    this.app
      .route(`/users`)
      .get(
        usersMiddleware.extractPaginationParameters,
        usersController.listUsers
      )
      .post(
        usersMiddleware.validateRequiredUserBodyFields,
        usersController.createUser
      );

    this.app.param(`userId`, usersMiddleware.extractUserId);
    this.app
      .route(`/users/:userId`)
      .all(usersMiddleware.validateOrgainzerExists)
      .get(usersController.getUserById)
      .delete(usersController.removeUser);

    this.app.put(`/users/:userId`, [
      usersMiddleware.validateRequiredUserBodyFields,
      usersController.put,
    ]);

    return this.app;
  }
}
