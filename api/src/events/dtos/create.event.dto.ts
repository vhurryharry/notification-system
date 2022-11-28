export interface CreateEventDto {
  name: string;
  isOutside: boolean;
  location: string;
  date: Date;
  organizerId: number;
}
