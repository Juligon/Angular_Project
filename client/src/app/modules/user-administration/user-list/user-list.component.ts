import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
	selector: "app-user-list",
	templateUrl: "./user-list.component.html",
	styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
	userList: User[] = [];
	selectedUser: User | null = null;

	// inyecta un servicio dentro del componente
	constructor(
		private userService: UserService,
		private matSnackBar: MatSnackBar,
		private router: Router
	) {}

	// las peticiones a los servicios de hacen en el onInit
	// me suscribo al servicio para obtener los datos que llegan
	ngOnInit() {
		this.loadUser();
	}

	loadUser() {
		this.userService.findAll().subscribe(
			(response) => {
				if (response.body)
					this.userList = response.body.map(
						(json) => new User(json.id, json.name, json.lastName, json.age)
					);
			},
			(error) => {
				console.log(error);
			}
		);
	}

	selectUser(user: User) {
		this.router.navigate(["user", "detail", user.id]);
	}

	createUser() {
		this.router.navigate(["user", "create"]);
	}

	deleteUser() {
		// @ts-ignore
		this.userService.deleteUser(user.id).subscribe(
			(res) => {
				this.matSnackBar.open("Usuario eliminado correctamente", "Cerrar");
				this.loadUser();
			},
			(error) => {
				console.log(error);
				this.matSnackBar.open(error, "Cerrar");
			}
		);
	}
}
