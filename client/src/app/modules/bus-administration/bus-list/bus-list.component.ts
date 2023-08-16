import { Component, OnInit } from '@angular/core';
import { Bus } from 'src/app/models/bus';
import { BusService } from 'src/app/services/bus.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModelService } from 'src/app/services/model.service';
import { Model } from 'src/app/models/model';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.css'],
})
export class BusListComponent implements OnInit {
  displayedColumns = ['id', 'patente', 'asientos', 'modeloId', 'acciones'];
  dataSource = [new Bus(1, 'ACB123', 50, 23)];

  busesList: Bus[] = [];
  selectedBus: Bus | null = null;

  constructor(
    private busService: BusService,
    private modelService: ModelService,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadBuses();
  }

  loadBuses() {
    this.busService.findAll().subscribe(
      (res) => {
        if (res.body) {
          const busesWithModels: Bus[] = [];
          const observables = res.body.map((json) => {
            const bus = new Bus(
              json.id,
              json.patente,
              json.asientos,
              json.modeloId
            );
            return this.findModelBus(bus).pipe(
              map((model) => {
                if (model !== null) {
                  bus.modelo = model;
                }
                return bus;
              })
            );
          });
          forkJoin(observables).subscribe((buses) => {
            this.busesList = buses;
            console.log('Buses with Models:', this.busesList);
          });
        }
      },
      (error) => {
        console.log(error);
        this.matSnackBar.open(error, 'cerrar');
      }
    );
  }
  
  findModelBus(bus: Bus): Observable<Model | null> {
    if (bus.modeloId) {
      return this.modelService.findOne(bus.modeloId).pipe(
        map((res) => {
          if (res) {
            return new Model(res.id, res.nombre, res.marca);
          }
          return null;
        }),
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      );
    }
    return of(null);
  }

  selectBus(bus: Bus) {
    this.router.navigate(['buses', 'detail', bus.id]);
  }

  createBus() {
    this.router.navigate(['buses', 'create']);
  }

  deleteBus(bus: Bus) {
    this.busService.deleteBus(bus.id).subscribe(
      (res) => {
        if (res.message) {
          this.matSnackBar.open(res.message, 'Cerrar');
        } else {
          this.matSnackBar.open('Eliminado correctamente', 'Cerrar');
        }

        this.busesList = this.busesList.filter(
          (element) => element.id !== bus.id
        );
        this.loadBuses();
      },
      (error) => {
        console.log(error);
        this.matSnackBar.open(error, 'Cerrar');
      }
    );
  }
}
