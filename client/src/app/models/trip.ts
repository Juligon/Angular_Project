import { Bus } from './bus';

export class Trip {
  id: number;
  origin: string;
  destination: string;
  departure: Date;
  regress: Date;
  userId?: number[];
  busId?: number;
  bus?: Bus;

  constructor(
    id: number,
    origin: string,
    destination: string,
    departure: string,
    regress: string,
    userId: number[],
    busId: number
  ) {
    this.id = id;
    this.origin = origin;
    this.destination = destination;
    this.departure = new Date(departure);
    this.regress = new Date(regress);
    this.userId = userId;
    this.busId = busId;
  }
}
