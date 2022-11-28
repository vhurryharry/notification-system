import { Event, User } from "@prisma/client";

export interface ListEventDtoItem extends Event {
  attendees: User[];
  organizer: User;
}

export interface ListEventDto {
  total_count: number;
  events: ListEventDtoItem[];
}
