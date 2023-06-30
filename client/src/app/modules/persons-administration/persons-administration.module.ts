import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PersonDetailComponent } from "./person-detail/person-detail.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PersonsListComponent } from "./persons-list/persons-list.component";
import { PersonsAdministrationRoutingModule } from "./persons-administration-routing.module";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
	declarations: [PersonDetailComponent, PersonsListComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		PersonsAdministrationRoutingModule,
		MatButtonModule,
		MatCardModule,
		MatDatepickerModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatSnackBarModule,
	],
	exports: [PersonDetailComponent, PersonsListComponent],
})
export class PersonsAdministrationModule {}
