import { Component, OnInit } from "@angular/core";
import { Person } from "src/app/models/person";
import { PersonService } from "src/app/services/person.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
	selector: "app-persons-list",
	templateUrl: "./persons-list.component.html",
	styleUrls: ["./persons-list.component.css"],
})
export class PersonsListComponent implements OnInit {
	personsList: Person[] = [];
	selectedPerson: Person | null = null;

	// inyecta un servicio dentro del componente
	constructor(
		private personService: PersonService,
		private matSnackBar: MatSnackBar,
		private router: Router
	) {}

	// las peticiones a los servicios de hacen en el onInit
	// me suscribo al servicio para obtener los datos que llegan
	ngOnInit() {
		this.loadPerson();
	}

	loadPerson() {
		this.personService.findAll().subscribe(
			(response) => {
				if (response.body)
					this.personsList = response.body.map(
						(json) => new Person(json.id, json.nombre, json.apellido, json.edad)
					);
			},
			(error) => {
				console.log(error);
			}
		);
	}

	selectPerson(persona: Person) {
		this.router.navigate(["person", "detail", persona.id]);
	}

	createPerson() {
		this.router.navigate(["person", "create"]);
	}

	deletePerson(persona: Person) {
		this.personService.deletePerson(persona.id).subscribe(
			(res) => {
				this.matSnackBar.open("Persona eliminada correctamente", "Cerrar");
				this.loadPerson();
			},
			(error) => {
				console.log(error);
				this.matSnackBar.open(error, "Cerrar");
			}
		);
	}
}
