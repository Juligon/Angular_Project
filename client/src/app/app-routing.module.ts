import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { PersonsListComponent } from "./modules/persons-administration/persons-list/persons-list.component";
import { PersonDetailComponent } from "./modules/persons-administration/person-detail/person-detail.component";
import { AdminLayoutComponent } from "./shared/admin-layout/admin-layout/admin-layout.component";

const routes: Routes = [
	{ path: "", redirectTo: "persons", pathMatch: "full" },
	// { path: 'list', component: PersonsListComponent },
	// { path: 'detail', component: PersonDetailComponent },
	{
		path: "",
		component: AdminLayoutComponent,
		children: [
			{
				path: "persons",
				loadChildren: () =>
					import(
						"./modules/persons-administration/persons-administration.module"
					).then((mod) => mod.PersonsAdministrationModule),
			},
			{
				path: "buses",
				loadChildren: () =>
					import(
						"./modules/buses-administration/buses-administration.module"
					).then((mod) => mod.BusesAdministrationModule),
			},
			{
				path: "trips",
				loadChildren: () =>
					import(
						"./modules/trips-administration/trips-administration.module"
					).then((mod) => mod.TripsAdministrationModule),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
