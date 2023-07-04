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
    patente: ['', Validators.required],
    cantidadAsientos: [0, Validators.required],
    modeloId: [0, Validators.required],
    modelo: ['', Validators.required]
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
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log('El id que estoy editando es: ' + id);
      if (id) {
        //@ts-ignore
        this.findModelBus(id);
      }
    });
  }

  findModelBus(colectivo: Bus) {
    this.modelService.findOne(colectivo.modeloId).subscribe((res) => {
      if (res) 
      colectivo.modelo = new Model(res.id, res.nombre, res.marca);
    });
  }

  findBus(id: number) {
    this.busService.findOne(id).subscribe(
      (res) => {
        if (res) {
          this.selectedBus = res;

          this.busForm.patchValue({
            patente: res.patente,
            cantidadAsientos: res.cantidadAsientos,
            modeloId: res.modeloId,
            //@ts-ignore
            modelo: res.modelo
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
      patente: this.busForm.get('patente')?.value,
      //@ts-ignore
      cantidadAsientos: this.busForm.get('cantidadAsientos')?.value,
      //@ts-ignore
      modeloId: this.busForm.get('modeloId')?.value,
      //@ts-ignore
      modelo: this.busForm.get('modelo')?.value,
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

