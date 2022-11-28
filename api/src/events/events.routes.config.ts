import { CommonRoutesConfig } from "@app/common/common.routes.config";
import eventsController from "@app/events/controllers/events.controller";
import eventsMiddleware from "@app/events/middleware/events.middleware";
import express from "express";

export class EventsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "eventsRoutes");
  }

  configureRoutes() {
    this.app
      .route(`/events`)
      .get(
        eventsMiddleware.extractTime,
        eventsMiddleware.extractPaginationParameters,
        eventsController.listEvents
      )
      .post(
        eventsMiddleware.validateRequiredEventBodyFields,
        eventsController.createEvent
      );

    this.app.param(`eventId`, eventsMiddleware.extractEventId);
    this.app
      .route(`/events/:eventId`)
      .all(eventsMiddleware.validateEventExists)
      .get(eventsController.getEventById)
      .delete(eventsController.removeEvent);

    this.app.put(`/events/:eventId`, [eventsController.put]);

    return this.app;
  }
}
