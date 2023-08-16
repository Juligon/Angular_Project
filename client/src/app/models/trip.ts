import { Bus } from './bus';

export class Trip {
  id: number;
  origen: string;
  destino: string;
  ida: Date;
  vuelta: Date;
  usuarioId?: number[];
  colectivoId: number;
  colectivo?: Bus;

  constructor(
    id: number,
    origen: string,
    destino: string,
    ida: string,
    vuelta: string,
    usuarioId: number[],
    colectivoId: number
  ) {
    this.id = id;
    this.origen = origen;
    this.destino = destino;
    this.ida = new Date(ida);
    this.vuelta = new Date(vuelta);
    this.usuarioId = usuarioId;
    this.colectivoId = colectivoId;
  }
}