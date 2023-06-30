import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripsListComponent } from './trips-list/trips-list.component';
import { TripDetailComponent } from './trip-detail/trip-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: TripsListComponent },
  { path: 'create', component: TripDetailComponent },
  { path: 'detail/:id', component: TripDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripsAdministrationRoutingModule {}
