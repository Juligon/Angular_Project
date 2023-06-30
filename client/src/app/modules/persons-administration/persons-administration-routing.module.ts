import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonsListComponent } from './persons-list/persons-list.component';
import { PersonsDetailComponent } from './person-detail/person-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: PersonsListComponent },
  { path: 'create', component: PersonsDetailComponent },
  { path: 'detail/:id', component: PersonsDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonsAdministrationRoutingModule {}
