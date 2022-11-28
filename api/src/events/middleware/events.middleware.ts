import eventsService from "@app/events/services/events.service";
import express from "express";

class EventsMiddleware {
  async validateRequiredEventBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (
      req.body &&
      req.body.name &&
      req.body.isOutside &&
      req.body.location &&
      req.body.date
    ) {
      next();
    } else {
      res.status(400).send({
        error: `Missing required fields - name, isOutside, location, date`,
      });
    }
  }

  async validateEventExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const event = await eventsService.readById(parseInt(req.params.eventId));
    if (event) {
      next();
    } else {
      res.status(404).send({
        error: `Event ${req.params.eventId} not found`,
      });
    }
  }

  async extractEventId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body = {
      ...req.body,
      id: parseInt(req.params.eventId),
    };

    next();
  }

  async extractTime(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body = {
      ...req.body,
      from: req.query.from ? new Date(req.query.from as string) : new Date(),
      until: req.query.until ? new Date(req.query.until as string) : null,
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

export default new EventsMiddleware();
