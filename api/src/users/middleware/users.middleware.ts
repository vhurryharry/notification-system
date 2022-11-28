import express from "express";
import usersService from "@app/users/services/users.service";

class UsersMiddleware {
  async validateRequiredUserBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.name) {
      next();
    } else {
      res.status(400).send({
        error: `Missing required field name`,
      });
    }
  }

  async validateOrgainzerExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await usersService.readById(parseInt(req.params.userId));
    if (user) {
      next();
    } else {
      res.status(404).send({
        error: `User ${req.params.userId} not found`,
      });
    }
  }

  async extractUserId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body = {
      ...req.body,
      id: parseInt(req.params.userId),
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
      limit: req.query.limit || 100,
      page: req.query.page || 0,
    };

    next();
  }
}

export default new UsersMiddleware();
