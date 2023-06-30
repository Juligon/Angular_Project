import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BusListComponent} from "./bus-list/bus-list.component";

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: "full"},
  {path: 'list', component: BusListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusAdministrationRoutingModule { }