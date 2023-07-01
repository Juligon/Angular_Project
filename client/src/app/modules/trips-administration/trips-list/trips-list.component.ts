import { Component, OnInit } from '@angular/core';
import { Trip } from '../../../models/trip';
import { TripService } from '../../../services/trip.service';
import { ModelService } from '../../../services/model.service';
import { BusService } from '../../../services/bus.service';

@Component({
  selector: 'app-trips.ts-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.css'],
})
export class TripsListComponent implements OnInit {
  displayedColumns = [
    'id',
    'origen',
    'destino',
    'fechaLlegada',
    'fechaSalida',
    'colectivo',
    'acciones',
  ];
  dataSource = [
    new Trip(1, 'Viedma', 'Patagones', '2023-06-29', '2023-06-29', 1),
  ];

  constructor(
    private tripService: TripService,
    private busService: BusService
  ) {}

  ngOnInit() {
    this.tripService.findAll().subscribe((res) => {
      if (res.body)
        this.dataSource = res.body.map((res) => {
          const trip = new Trip(
            res.id,
            res.lugarDestino,
            res.lugarSalida,
            res.fechaLlegada,
            res.fechaSalida,
            res.idColectivo
          );
          this.loadBus(trip);
          return trip;
        });
    });
  }

  loadBus(trip: Trip) {
    this.busService.findOne(trip.idColectivo).subscribe((res) => {
      trip.colectivo = res;
    });
  }
}
