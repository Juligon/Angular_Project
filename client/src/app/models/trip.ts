import { Bus } from './bus';

export class Trip {
  id: number;
  lugarSalida: string;
  lugarDestino: string;
  fechaLlegada: Date;
  fechaSalida: Date;
  usuarioId: number[] | undefined;
  idColectivo: number;
  colectivo: Bus | undefined;

  constructor(
    id: number,
    lugarSalida: string,
    lugarDestino: string,
    fechaLlegada: string,
    fechaSalida: string,
    idColectivo: number
  ) {
    this.id = id;
    this.lugarSalida = lugarSalida;
    this.lugarDestino = lugarDestino;
    this.fechaLlegada = new Date(fechaLlegada);
    this.fechaSalida = new Date(fechaSalida);
    this.idColectivo = idColectivo;
  }
}
