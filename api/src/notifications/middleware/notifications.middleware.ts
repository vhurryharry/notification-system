import categoriesService from "@app/categories/services/categories.service";
import channelsService from "@app/channels/services/channels.service";
import notificationsService from "@app/notifications/services/notifications.service";
import express from "express";

class NotificationsMiddleware {
  async validateRequiredNotificationBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.content && req.body.category && req.body.channel) {
      next();
    } else {
      res.status(400).send({
        error: `Missing required fields - content, category, channel`,
      });
    }
  }

  async validateNotificationExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const notification = await notificationsService.readById(
      parseInt(req.params.notificationId)
    );
    if (notification) {
      next();
    } else {
      res.status(404).send({
        error: `Notification ${req.params.notificationId} not found`,
      });
    }
  }

  async validateCategoryExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const category = await categoriesService.readById(
      parseInt(req.params.category)
    );
    if (category) {
      next();
    } else {
      res.status(404).send({
        error: `Unknown Category ${req.params.category}`,
      });
    }
  }

  async validateChannelExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const channel = await channelsService.readById(
      parseInt(req.params.channel)
    );
    if (channel) {
      next();
    } else {
      res.status(404).send({
        error: `Unknown Channel ${req.params.channel}`,
      });
    }
  }

  async extractNotificationId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body = {
      ...req.body,
      id: parseInt(req.params.notificationId),
    };

    next();
  }

  async extractPaginationParameters(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body = {
      ...req.body,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      page: req.query.page ? parseInt(req.query.page as string) : 0,
    };

    next();
  }
}

export default new NotificationsMiddleware();
