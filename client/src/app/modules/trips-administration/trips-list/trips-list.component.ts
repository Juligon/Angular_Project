import { Component, OnInit } from '@angular/core';
import { Trip } from '../../../models/trip';
import { TripService } from '../../../services/trip.service';
import { ModelService } from '../../../services/model.service';
import { BusService } from '../../../services/bus.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PassengersDialogComponent } from '../passengers-dialog/passengers-dialog.component';

@Component({
  selector: 'app-trips-list',
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
    'pasajeros',
    'acciones'
  ];

  tripsList: Trip[] = [];

  constructor(
    private tripService: TripService,
    private busService: BusService,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadTrips();
  }

  loadTrips() {
    this.tripService.findAll().subscribe((res) => {
      if (res.body) {
        this.tripsList = res.body.map((res) => {
          const trip = new Trip(
            res.id,
            res.lugarSalida,
            res.lugarDestino,
            res.fechaLlegada,
            res.fechaSalida,
            res.personaId,
            res.idColectivo
          );
          this.loadBus(trip);
          return trip;
        });
      }
    });
  }

  loadBus(trip: Trip) {
    this.busService.findOne(trip.idColectivo).subscribe((res) => {
      trip.colectivo = res;
    });
  }

  selectTrip(trip: Trip) {
    this.router.navigate(['trips', 'detail', trip.id]);
  }

  createTrip() {
    this.router.navigate(['trips', 'create']);
  }

  deleteTrip(trip: Trip) {
    this.tripService.deleteTrip(trip.id).subscribe(
      (res) => {
        this.matSnackBar.open('Eliminado correctamente', 'Cerrar');
        this.tripsList = this.tripsList.filter((element) => element.id !== trip.id);
        this.loadTrips();
      },
      (error) => {
        console.log(error);
        this.matSnackBar.open(error, 'Cerrar');
      }
    );
  }

  openPassengersDialog(trip: Trip) {
    const dialogRef = this.dialog.open(PassengersDialogComponent, {
      width: '300px',
      height: 'fit-content',
      data: {
        passengers: trip.personaId
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
    
    });
  }
}







