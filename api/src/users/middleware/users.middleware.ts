import express from "express";

class UsersMiddleware {
  async validateRequiredUserBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.email && req.body.password) {
      next();
    } else {
      res.status(400).send({
        error: `Missing required field name`,
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
