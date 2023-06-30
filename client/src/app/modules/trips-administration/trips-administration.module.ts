import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripsAdministrationRoutingModule } from './trips-administration-routing.module';
import { TripsListComponent } from './trips-list/trips-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TripsDetailComponent } from './trips-detail/trips-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [TripsListComponent, TripsDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TripsAdministrationRoutingModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class TripsAdministrationModule {}
