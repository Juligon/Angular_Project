import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BusService } from '../../../services/bus.service';
import { Bus } from '../../../models/bus';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../models/user';
import { ModelService } from '../../../services/model.service';
import { Model } from '../../../models/model';
import { UserService } from '../../../services/user.service';
import { TripDTO, TripService } from '../../../services/trip.service';
import { Trip } from '../../../models/trip';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css'],
})
export class TripDetailComponent implements OnInit {
  tripForm = this.formBuilder.group({
    origen: ['', Validators.required],
    destino: ['', Validators.required],
    ida: [new Date(), Validators.required],
    vuelta: [new Date(), Validators.required],
    usuarioId: [[], Validators.required],
    colectivoId: [0, Validators.required],
  });

  busesList: Bus[] = [];
  usersList: User[] = [];
  selectedTrip: Trip | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private busService: BusService,
    private modelService: ModelService,
    private userService: UserService,
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
              json.asientos,
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

    this.userService.findAll().subscribe((res) => {
      if (res.body)
        this.usersList = res.body.map(
          (json) => new User(json.id, json.nombre, json.apellido, json.edad)
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

  findModelBus(bus: Bus) {
    if (bus.modeloId)
      this.modelService.findOne(bus.modeloId).subscribe((res) => {
        if (res) bus.modelo = new Model(res.id, res.nombre, res.marca);
      });
  }

  findTrip(id: number) {
    this.tripService.findOne(id).subscribe(
      (res) => {
        if (res.body) {
          this.selectedTrip = res.body;

          this.tripForm.patchValue({
            origen: res.body.origen,
            destino: res.body.destino,
            ida: new Date(res.body.ida),
            vuelta: new Date(res.body.vuelta),
            usuarioId: res.body.usuarioId,
            colectivoId: res.body.colectivoId,
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
    const usuarioId: number[] = this.tripForm.get('usuarioId')?.value;

    const body: TripDTO = {
      //@ts-ignore
      origen: this.tripForm.get('origen')?.value,
      //@ts-ignore
      destino: this.tripForm.get('destino')?.value,
      //@ts-ignore
      ida: this.tripForm.get('ida')?.value,
      //@ts-ignore
      vuelta: this.tripForm.get('vuelta')?.value,
      usuarioId: usuarioId,
      //@ts-ignore
      colectivoId: this.tripForm.get('colectivoId')?.value,
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

  compareObjects(o1: any, o2: any) {
    if (o1 && o2 && o1.id == o2.id) return true;
    else return false;
  }

  goBack() {
    //this._location.back();
    this.router.navigate(['trips', 'list']);
  }

  colorControl = new FormControl('primary' as ThemePalette);
}
