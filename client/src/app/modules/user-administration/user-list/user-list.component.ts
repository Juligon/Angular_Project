import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  usersList: User[] = [];
  selectedUser: User | null = null;

  // inyecta un servicio dentro del componente
  constructor(
    private userService: UserService,
    private matSnackBar: MatSnackBar,
    private router: Router,
  ) {}

  // las peticiones a los servicios de hacen en el onInit
  // me suscribo al servicio para obtener los datos que llegan
  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.userService.findAll().subscribe(
      (res) => {
        if (res.body)
          this.usersList = res.body.map(
            (json) => new User(json.id, json.name, json.lastName, json.age)
          );
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  selectUser(user: User) {
    this.router.navigate(['users', 'detail', user.id]);
  }

  createUser() {
    this.router.navigate(['users', 'create']);
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe(
      (res) => {
        if (res.message) {
          this.matSnackBar.open(res.message, 'Cerrar');
        } else {
          this.matSnackBar.open('Eliminado correctamente', 'Cerrar');
        }
        this.loadUser();
      },
      (error) => {
        console.log(error);
        this.matSnackBar.open(error, 'Cerrar');
      }
    );
  }
  
}
