import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BusService } from '../../../services/bus.service';
import { Bus } from '../../../models/bus';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Person } from '../../../models/person';
import { ModelService } from '../../../services/model.service';
import { Model } from '../../../models/model';
import { PersonService } from '../../../services/person.service';
import { TripDTO, TripService } from '../../../services/trip.service';
import { Trip } from '../../../models/trip';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css'],
})
export class TripDetailComponent implements OnInit {
  tripForm = this.formBuilder.group({
    origen: ['', Validators.required],
    destino: ['', Validators.required],
    fechaSalida: [new Date(), Validators.required],
    fechaLlegada: [new Date(), Validators.required],
    colectivo: [0, Validators.required],
    pasajeros: [[], Validators.required],
  });

  busesList: Bus[] = [];
  personsList: Person[] = [];
  selectedTrip: Trip | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private busService: BusService,
    private modelService: ModelService,
    private personService: PersonService,
    private tripService: TripService,
    private router: Router,
    private route: ActivatedRoute,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit() {
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
            this.findModelBus(bus);
            return bus;
          });
      },
      (error) => {
        console.log(error);
        this.matSnackBar.open(error, 'cerrar');
      }
    );

    this.personService.findAll().subscribe((res) => {
      if (res.body)
        this.personsList = res.body.map(
          (json) => new Person(json.id, json.name, json.lastName, json.age)
        );
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log('El id que estoy editando es: ' + id);
      if (id) {
        this.findTrip(Number(id));
      }
    });
  }

  findModelBus(colectivo: Bus) {
    this.modelService.findOne(colectivo.modeloId).subscribe((res) => {
      if (res) 
      colectivo.modelo = new Model(res.id, res.nombre, res.marca);
    });
  }

  findTrip(id: number) {
    this.tripService.findOne(id).subscribe(
      (res) => {
        if (res.body) {
          this.selectedTrip = res.body;

          this.tripForm.patchValue({
            origen: res.body.lugarSalida,
            destino: res.body.lugarDestino,
            fechaSalida: new Date(res.body.fechaSalida),
            fechaLlegada: new Date(res.body.fechaLlegada),
            colectivo: res.body.idColectivo,
            pasajeros: res.body.personaId
          });
        }
      },
      (error) => {
        console.log(error);
        this.matSnackBar.open(error, 'Cerrar');
        this.router.navigate(['trips', 'list']);
      }
    );
  }

  saveChanges() {
    //@ts-ignore
    const pasajeros: number[] = this.tripForm.get('pasajeros')?.value;

    const body: TripDTO = {
      //@ts-ignore
      lugarSalida: this.tripForm.get('origen')?.value,
      //@ts-ignore
      lugarDestino: this.tripForm.get('destino')?.value,
      //@ts-ignore
      fechaLlegada: this.tripForm.get('fechaLlegada')?.value,
      //@ts-ignore
      fechaSalida: this.tripForm.get('fechaSalida')?.value,
      personaId: pasajeros,
      //@ts-ignore
      idColectivo: this.tripForm.get('colectivo')?.value,
    };

    if (this.selectedTrip && this.selectedTrip.id) {
      // LLamar al metodo actualizar
      console.log('Actualizando viaje');

      body.id = this.selectedTrip.id;

      this.tripService.updateTrip(body).subscribe(
        (res) => {
          this.matSnackBar.open('Se guardaron los cambios', 'Cerrar');
          this.router.navigate(['trips', 'list']);
        },
        (error) => {
          console.log(error);
          this.matSnackBar.open(error, 'Cerrar');
        }
      );
    } else {
      this.tripService.createTrip(body).subscribe(
        (res) => {
          this.matSnackBar.open('Creado correctamente', 'Cerrar');
          this.router.navigate(['trips', 'list']);
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
    this.router.navigate(['trips', 'list']);
  }
}
