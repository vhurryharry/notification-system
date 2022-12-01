import express from "express";
import usersService from "@app/users/services/users.service";
import notificationsService from "@app/notifications/services/notifications.service";

class UsersController {
  async login(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const user = await usersService.login(req.body.email, req.body.password);
      res.status(200).send(user);
    } catch (e) {
      next(e);
    }
  }

  async getNotifications(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const user = await usersService.readById(req.body.id);
      const notifications = await notificationsService.list(
        user?.subscribed?.map((c) => c.id) || [],
        user?.channels?.map((c) => c.id) || []
      );
      res.status(200).send(notifications);
    } catch (e) {
      next(e);
    }
  }
}

export default new UsersController();
