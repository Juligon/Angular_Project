import { Component, OnInit } from "@angular/core";
import { User } from "../../../models/user";
import { UserService } from "../../../services/user.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
	selector: "app-users-list",
	templateUrl: "./users-list.component.html",
	styleUrls: ["./users-list.component.css"],
})
export class UsersListComponent implements OnInit {
	usersList: User[] = [];
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
			(res) => {
				if (res.body)
					this.usersList = res.body.map(
						(json) => new User(json.id, json.name, json.lastname, json.age)
					);
			},
			(error: any) => {
				console.log(error);
			}
		);
	}

	selectUser(user: User) {
		this.router.navigate(["users", "detail", user.id]);
	}

	createUser() {
		this.router.navigate(["users", "create"]);
	}

	deleteUser(user: User) {
		this.userService.deleteUser(user.id).subscribe(
			(res: any) => {
				this.matSnackBar.open("Eliminado correctamente", "Cerrar");
				this.loadUser();
			},
			(error: any) => {
				console.log(error);
				this.matSnackBar.open(error, "Cerrar");
			}
		);
	}
}
