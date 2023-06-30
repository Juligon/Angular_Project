import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersDetailComponent } from "./users-detail/users-detail.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UsersListComponent } from "./users-list/users-list.component";
import { UsersAdministrationRoutingModule } from "./users-administration-routing.module";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
	declarations: [UsersDetailComponent, UsersListComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		UsersAdministrationRoutingModule,
		MatButtonModule,
		MatCardModule,
		MatDatepickerModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatSnackBarModule,
	],
	exports: [UsersDetailComponent, UsersListComponent],
})
export class UsersAdministrationModule {}
