import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { UsersListComponent } from "./modules/users-administration/users-list/users-list.component";
import { UserDetailComponent } from "./modules/users-administration/user-detail/user-detail.component";
import { AdminLayoutComponent } from "./shared/admin-layout/admin-layout/admin-layout.component";

const routes: Routes = [
	{ path: "", redirectTo: "users", pathMatch: "full" },
	// { path: 'list', component: UsersListComponent },
	// { path: 'detail', component: UserDetailComponent },
	{
		path: "",
		component: AdminLayoutComponent,
		children: [
			{
				path: "users",
				loadChildren: () =>
					import(
						"./modules/users-administration/users-administration.module"
					).then((mod) => mod.UsersAdministrationModule),
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
