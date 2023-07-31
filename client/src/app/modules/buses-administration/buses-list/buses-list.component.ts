import { Component, OnInit } from '@angular/core';
import { Bus } from 'src/app/models/bus';
import { BusService } from 'src/app/services/bus.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModelService } from 'src/app/services/model.service';
import { Model } from 'src/app/models/model';


@Component({
  selector: 'app-buses-list',
  templateUrl: './buses-list.component.html',
  styleUrls: ['./buses-list.component.css'],
})
export class BusesListComponent implements OnInit {
  displayedColumns = [
    'id',
    'plate',
    'seats',
    'model',
    'actions'
  ];
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
        if (res.body)
          this.busesList = res.body.map((json) => {
            const bus = new Bus(
              json.id,
              json.plate,
              json.seats,
              json.modelId
            );
            this.findModelBus(bus);
            return bus;
          });
      },
      (error) => {
        console.log(error);
        this.matSnackBar.open(error, 'cerrar');
      }
    );
  }

  findModelBus(bus: Bus) {
    if (bus.modelId)
    this.modelService.findOne(bus.modelId).subscribe((res) => {
      if (res) 
      bus.model = new Model(res.id, res.name, res.brand);
    });
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
        this.busesList = this.busesList.filter((element) => element.id !== bus.id);
        this.loadBuses();
      },
      (error) => {
        console.log(error);
        this.matSnackBar.open(error, 'Cerrar');
      }
    );
  }

}
