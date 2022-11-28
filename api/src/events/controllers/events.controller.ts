import express from "express";
import eventsService from "@app/events/services/events.service";

class EventsController {
  async listEvents(req: express.Request, res: express.Response) {
    const events = await eventsService.list(
      req.body.from,
      req.body.until,
      req.body.limit,
      req.body.page
    );
    res.status(200).send(events);
  }

  async getEventById(req: express.Request, res: express.Response) {
    const event = await eventsService.readById(req.body.id);
    res.status(200).send(event);
  }

  async createEvent(req: express.Request, res: express.Response) {
    const eventId = await eventsService.create(req.body);
    res.status(201).send({ id: eventId });
  }

  async put(req: express.Request, res: express.Response) {
    await eventsService.putById(req.body.id, req.body);
    res.status(204).send();
  }

  async removeEvent(req: express.Request, res: express.Response) {
    await eventsService.deleteById(req.body.id);
    res.status(204).send();
  }
}

export default new EventsController();
