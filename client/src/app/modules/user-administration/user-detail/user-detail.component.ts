import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, UserDTO } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  selectedUser: User | null = null;

  //validaciones
  // nombreControl = new FormControl('', [Validators.required]);
  // apellidoControl = new FormControl('', [Validators.required]);
  // edadControl = new FormControl('', [Validators.required]);

  userForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    age: [0, [Validators.required, Validators.min(0), Validators.max(101)]],
  });

  constructor(
    private userService: UserService,
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
        this.findUser(Number(id));
      }
    });
  }

  findUser(id: number) {
    this.userService.findOne(id).subscribe(
      (res) => {
        if (res.body) {
          this.selectedUser = new User(
            res.body.id,
            res.body.name,
            res.body.lastName,
            res.body.age
          );

          this.userForm.patchValue({
            name: this.selectedUser.name,
            lastName: this.selectedUser.lastName,
            age: this.selectedUser.age,
          });
        }
      },
      (error) => {
        console.log(error);
        this.matSnackBar.open(error, 'Cerrar');
        this.router.navigate(['users', 'list']);
      }
    );
  }

  saveChanges() {
    const body: UserDTO = {
      // @ts-ignore
      id: null,
      name: this.userForm.get('name')?.value,
      lastName: this.userForm.get('lastName')?.value,
      age: this.userForm.get('age')?.value,
    };

    if (this.selectedUser && this.selectedUser.id) {
      // LLamar al metodo actualizar
      body.id = this.selectedUser.id;

      this.userService.updateUser(body).subscribe(
        (res) => {
          this.matSnackBar.open('Se guardaron los cambios', 'Cerrar');
          this.router.navigate(['users', 'list']);
        },
        (error) => {
          console.log(error);
          this.matSnackBar.open(error, 'Cerrar');
        }
      );
    } else {
      // Llamar al metodo crear
      this.userService.createUser(body).subscribe(
        (res) => {
          this.matSnackBar.open('Creado correctamente', 'Cerrar');
          this.router.navigate(['users', 'list']);
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
    this.router.navigate(['users', 'list']);
  }
}
