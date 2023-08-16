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
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css'],
})
export class TripListComponent implements OnInit {
  displayedColumns = [
    'id',
    'origen',
    'destino',
    'ida',
    'vuelta',
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
            res.origen,
            res.destino,
            res.ida,
            res.vuelta,
            res.usuarioId,
            res.colectivoId
          );
          this.loadBus(trip);
          return trip;
        });
      }
    });
  }

  loadBus(trip: Trip) {
    this.busService.findOne(trip.colectivoId).subscribe((res) => {
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
        passengers: trip.usuarioId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
