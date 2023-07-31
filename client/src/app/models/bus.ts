import { Model } from './model';

export class Bus {
  id: number;
  plate: string;
  seats: number;
  modelId?: number;
  model?: Model;

  constructor(
    id: number,
    plate: string,
    seats: number,
    model: number
  ) {
    this.id = id;
    this.plate = plate;
    this.seats = seats;
    this.modelId = model;
  }
}
