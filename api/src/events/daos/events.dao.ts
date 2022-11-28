import { PrismaClient, Event, User } from "@prisma/client";
import { getPrisma } from "@app/database";

import { CreateEventDto } from "@app/events/dtos/create.event.dto";
import { PutEventDto } from "@app/events/dtos/put.event.dto";
import { GetEventDto } from "../dtos/get.event.dto";
import { ListEventDto } from "../dtos/list.event.dto";

class EventsDao {
  prisma: PrismaClient;

  constructor() {
    this.prisma = getPrisma();
  }

  async addEvent(event: CreateEventDto): Promise<Event> {
    const result = await this.prisma.event.create({
      data: {
        name: event.name,
        isOutside: event.isOutside,
        location: event.location,
        date: event.date,
        organizer: {
          connect: {
            id: event.organizerId,
          },
        },
      },
    });

    return result;
  }

  async getEvents(
    from: Date,
    until: Date | null,
    limit: number,
    page: number
  ): Promise<ListEventDto> {
    const result = await this.prisma.event.findMany({
      where: {
        date: until
          ? {
              gte: from,
              lte: until,
            }
          : {
              gte: from,
            },
      },
      include: {
        organizer: true,
        attendees: true,
      },
      skip: limit * page,
      take: limit,
    });

    const count = await this.prisma.event.count({
      where: {
        date: until
          ? {
              gte: from,
              lte: until,
            }
          : {
              gte: from,
            },
      },
    });

    return {
      total_count: count,
      events: result,
    };
  }

  async getEvent(id: number): Promise<GetEventDto | null> {
    const result = await this.prisma.event.findUnique({
      where: {
        id,
      },
      include: {
        organizer: true,
        attendees: true,
      },
    });

    return result
      ? {
          ...result,
          weather: null,
        }
      : null;
  }

  async updateEvent(id: number, event: PutEventDto): Promise<Event> {
    const result = await this.prisma.event.update({
      where: {
        id,
      },
      data: {
        name: event.name,
        isOutside: event.isOutside,
        location: event.location,
        date: event.date,
        organizer: {
          connect: {
            id: event.organizerId,
          },
        },
      },
    });

    return result;
  }

  async removeEvent(id: number): Promise<Event> {
    const result = await this.prisma.event.delete({
      where: {
        id,
      },
    });

    return result;
  }
}

export default new EventsDao();
