import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusesAdministrationRoutingModule } from './buses-administration-routing.module';
import { BusesListComponent } from './buses-list/buses-list.component';
import { BusDetailComponent } from './bus-detail/bus-detail.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    BusesListComponent,
    BusDetailComponent
  ],
  imports: [
    CommonModule,
    BusesAdministrationRoutingModule,
    FormsModule,
		ReactiveFormsModule,
    MatButtonModule,
		MatCardModule,
		MatDatepickerModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatSnackBarModule,
    MatTableModule
  ], 
  exports: [BusDetailComponent, BusesListComponent],
})
export class BusesAdministrationModule { }
