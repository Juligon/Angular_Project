import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService, PersonDTO } from 'src/app/services/person.service';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css'],
})
export class PersonDetailComponent implements OnInit {
  selectedPerson: Person | null = null;

  //validaciones
  // nameControl = new FormControl('', [Validators.required]);
  // lastNameControl = new FormControl('', [Validators.required]);
  // ageControl = new FormControl('', [Validators.required]);

  personForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    age: [0, [Validators.required, Validators.min(0), Validators.max(101)]],
  });

  constructor(
    private personService: PersonService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _location: Location,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log('El id que estoy editando es: ' + id);
      if (id) {
        this.findPerson(Number(id));
      }
    });
  }

  findPerson(id: number) {
    this.personService.findOne(id).subscribe(
      (res) => {
        if (res.body) {
          this.selectedPerson = new Person(
            res.body.id,
            res.body.name,
            res.body.lastName,
            res.body.age
          );

          this.personForm.patchValue({
            name: this.selectedPerson.nombre,
            lastName: this.selectedPerson.apellido,
            age: this.selectedPerson.edad,
          });
        }
      },
      (error) => {
        console.log(error);
        this.matSnackBar.open(error, 'Cerrar');
        this.router.navigate(['person', 'list']);
      }
    );
  }

  saveChanges() {
    const body: PersonDTO = {
      // @ts-ignore
      id: null,
      name: this.personForm.get('name')?.value,
      lastName: this.personForm.get('lastName')?.value,
      age: this.personForm.get('age')?.value,
    };

    if (this.selectedPerson && this.selectedPerson.id) {
      // LLamar al metodo actualizar
      body.id = this.selectedPerson.id;

      this.personService.updatePerson(body).subscribe(
        (res) => {
          this.matSnackBar.open('Se guardaron los cambios', 'Cerrar');
          this.router.navigate(['person', 'list']);
        },
        (error) => {
          console.log(error);
          this.matSnackBar.open(error, 'Cerrar');
        }
      );
    } else {
      // Llamar al metodo crear
      this.personService.createPerson(body).subscribe(
        (res) => {
          this.matSnackBar.open('Creado correctamente', 'Cerrar');
          this.router.navigate(['person', 'list']);
        },
        (error) => {
          console.log(error);
          this.matSnackBar.open(error, 'Cerrar');
        }
      );
    }
    // console.log(this.userForm.value)
  }

  goBack() {
    //this._location.back();
    this.router.navigate(['person', 'list']);
  }
}
