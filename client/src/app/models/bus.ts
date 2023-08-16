import { Model } from './model';

export class Bus {
  id: number;
  patente: string;
  asientos: number;
  modeloId?: number;
  modelo?: Model;

  constructor(
    id: number,
    patente: string,
    asientos: number,
    modeloId: number
  ) {
    this.id = id;
    this.patente = patente;
    this.asientos = asientos;
    this.modeloId = modeloId;
  }
}
