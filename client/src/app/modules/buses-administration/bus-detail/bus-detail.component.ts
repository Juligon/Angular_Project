import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BusDTO, BusService } from '../../../services/bus.service';
import { Bus } from '../../../models/bus';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModelService } from '../../../services/model.service';
import { Model } from '../../../models/model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bus-detail',
  templateUrl: './bus-detail.component.html',
  styleUrls: ['./bus-detail.component.css'],
})
export class BusDetailComponent implements OnInit {
  busForm = this.formBuilder.group({
    plate: ['', Validators.required],
    seats: [0, Validators.required],
    modelId: [0, Validators.required],
  });

  modelsList: Model[] = [];
  selectedBus: Bus | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private busService: BusService,
    private modelService: ModelService,
    private router: Router,
    private route: ActivatedRoute,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.modelService.findAll().subscribe(
      (res) => {
        if (res.body)
          this.modelsList = res.body.map((json) => {
            const model = new Model(json.id, json.name, json.brand);
            return model;
          });
      },
      (error) => {
        console.log(error);
        this.matSnackBar.open(error, 'cerrar');
      }
    );

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.findBus(Number(id));
      }
    });
  }

  findModelBus(bus: Bus) {
    if (bus.modelId)
      this.modelService.findOne(bus.modelId).subscribe((res) => {
        if (res) 
        bus.model = new Model(res.id, res.name, res.brand);
      });
  }

  findBus(id: number) {
    this.busService.findOne(id).subscribe(
      (res) => {
        if (res) {
          this.selectedBus = new Bus(
            res.id,
            res.plate,
            res.seats,
            //@ts-ignore
            res.modelId
          );
          this.findModelBus(this.selectedBus);

          this.busForm.patchValue({
            plate: this.selectedBus.plate,
            seats: this.selectedBus.seats,
            modelId: this.selectedBus.modelId,
          });
        }
      },
      (error) => {
        console.log(error);
        this.matSnackBar.open(error, 'Cerrar');
        this.router.navigate(['buses', 'list']);
      }
    );
  }

  saveChanges() {
    const body: BusDTO = {
      //@ts-ignore
      plate: this.busForm.get('plate')?.value,
      //@ts-ignore
      seats: this.busForm.get('seats')?.value,
      //@ts-ignore
      modelId: this.busForm.get('modelId')?.value,
    };

    if (this.selectedBus && this.selectedBus.id) {
      // LLamar al metodo actualizar
      console.log('Actualizando colectivo');

      body.id = this.selectedBus.id;

      this.busService.updateBus(body).subscribe(
        (res) => {
          this.matSnackBar.open('Se guardaron los cambios', 'Cerrar');
          this.router.navigate(['buses', 'list']);
        },
        (error) => {
          console.log(error);
          this.matSnackBar.open(error, 'Cerrar');
        }
      );
    } else {
      this.busService.createBus(body).subscribe(
        (res) => {
          this.matSnackBar.open('Creado correctamente', 'Cerrar');
          this.router.navigate(['buses', 'list']);
        },
        (error) => {
          console.log(error);
          this.matSnackBar.open(error, 'Cerrar');
        }
      );
    }
  }

  goBack() {
    //this._location.back();
    this.router.navigate(['buses', 'list']);
  }
}
