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
    origin: ['', Validators.required],
    destination: ['', Validators.required],
    departure: [new Date(), Validators.required],
    regress: [new Date(), Validators.required],
    userId: [[], Validators.required],
    busId: [0, Validators.required],
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

    this.userService.findAll().subscribe((res) => {
      if (res.body)
        this.usersList = res.body.map(
          (json) => new User(json.id, json.name, json.lastName, json.age)
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
    if (bus.modelId)
      this.modelService.findOne(bus.modelId).subscribe((res) => {
        if (res) bus.model = new Model(res.id, res.name, res.brand);
      });
  }

  findTrip(id: number) {
    this.tripService.findOne(id).subscribe(
      (res) => {
        if (res.body) {
          this.selectedTrip = res.body;

          this.tripForm.patchValue({
            origin: res.body.origin,
            destination: res.body.destination,
            departure: new Date(res.body.departure),
            regress: new Date(res.body.regress),
            userId: res.body.userId,
            busId: res.body.busId,
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
    const userId: number[] = this.tripForm.get('userId')?.value;

    const body: TripDTO = {
      //@ts-ignore
      origin: this.tripForm.get('origin')?.value,
      //@ts-ignore
      destination: this.tripForm.get('destination')?.value,
      //@ts-ignore
      departure: this.tripForm.get('departure')?.value,
      //@ts-ignore
      regress: this.tripForm.get('regress')?.value,
      userId: userId,
      //@ts-ignore
      busId: this.tripForm.get('busId')?.value,
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
