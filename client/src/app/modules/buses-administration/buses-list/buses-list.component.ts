import { Component, OnInit } from '@angular/core';
import { Bus } from 'src/app/models/bus';
import { BusService } from 'src/app/services/bus.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-buses-list',
  templateUrl: './buses-list.component.html',
  styleUrls: ['./buses-list.component.css'],
})
export class BusesListComponent implements OnInit {
  displayedColumns = [
    'id',
    'patente',
    'cantidadAsientos',
    'modeloId',
    'editar',
    'borrar',
  ];
  dataSource = [new Bus(1, 'ACB123', 50, 23)];

  busesList: Bus[] = [];
  selectedBus: Bus | null = null;

  constructor(
    private busService: BusService,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.busService.findAll().subscribe((res) => {
      if (res.body)
        this.dataSource = res.body.map((res) => {
          const bus = new Bus(
            res.id,
            res.patente,
            res.cantidadAsientos,
            res.modeloId
          );
          this.loadBus();
          return bus;
        });
    });
  }

  loadBus() {
    this.busService.findAll().subscribe(
      (res) => {
        if (res.body)
          this.busesList = res.body.map((json) => {
            const bus = new Bus(
              json.id,
              json.patente,
              json.cantidadAsientos,
              json.modeloId
            );
            return bus;
          });
      },
      (error) => {
        console.log(error);
        this.matSnackBar.open(error, 'cerrar');
      }
    );
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
        this.matSnackBar.open('Eliminado correctamente', 'Cerrar');
        this.loadBus();
      },
      (error) => {
        console.log(error);
        this.matSnackBar.open(error, 'Cerrar');
      }
    );
  }
}
