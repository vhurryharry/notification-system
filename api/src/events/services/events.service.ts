import { Event } from "@prisma/client";

import { CRUD } from "@app/common/interfaces/crud.interface";

import eventsDao from "@app/events/daos/events.dao";
import { CreateEventDto } from "@app/events/dtos/create.event.dto";
import { PutEventDto } from "@app/events/dtos/put.event.dto";
import { GetEventDto } from "../dtos/get.event.dto";
import { getWeather, Weather } from "@app/utils/weather";
import { ListEventDto } from "../dtos/list.event.dto";

class EventsService implements Omit<CRUD, "list"> {
  async create(resource: CreateEventDto): Promise<Event> {
    return eventsDao.addEvent(resource);
  }

  async deleteById(id: number): Promise<Event> {
    return eventsDao.removeEvent(id);
  }

  async list(
    from: Date,
    until: Date | null,
    limit: number,
    page: number
  ): Promise<ListEventDto> {
    return await eventsDao.getEvents(from, until, limit, page);
  }

  async putById(id: number, resource: PutEventDto): Promise<any> {
    return eventsDao.updateEvent(id, resource);
  }

  async readById(id: number): Promise<GetEventDto | null> {
    const event = await eventsDao.getEvent(id);

    if (!event) return null;

    let weather: Weather | null = null;

    if (
      event.isOutside &&
      event.date.getTime() >= Date.now() &&
      event.date.getTime() - Date.now() < 7 * 1000 * 60 * 60 * 24
    ) {
      weather = await getWeather(event.location, event.date);
    }

    return {
      ...event,

      weather: weather,
    };
  }
}

export default new EventsService();
