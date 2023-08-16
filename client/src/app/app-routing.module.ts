import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout/admin-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  // { path: 'list', component: UserListComponent },
  // { path: 'detail', component: UserDetailComponent },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import(
            './modules/user-administration/user-administration.module'
          ).then((mod) => mod.UserAdministrationModule),
      },
      {
        path: 'buses',
        loadChildren: () =>
          import('./modules/bus-administration/bus-administration.module').then(
            (mod) => mod.BusAdministrationModule
          ),
      },
      {
        path: 'trips',
        loadChildren: () =>
          import(
            './modules/trip-administration/trip-administration.module'
          ).then((mod) => mod.TripAdministrationModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
