import { Event, User } from "@prisma/client";
import { Weather } from "@app/utils/weather";

export interface GetEventDto extends Event {
  attendees: Array<User>;
  organizer: User;
  weather: Weather | null;
}
