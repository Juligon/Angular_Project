import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { UsersListComponent } from "./modules/users-administration/users-list/users-list.component";
import { UsersDetailComponent } from "./modules/users-administration/users-detail/users-detail.component";
import { AdminLayoutComponent } from "./shared/admin-layout/admin-layout/admin-layout.component";

const routes: Routes = [
	{ path: "", redirectTo: "layout", pathMatch: "full" },
	// { path: 'list', component: UserListComponent },
	// { path: 'detail', component: UserDetailComponent },
	{
		path: "user",
		loadChildren: () =>
			import("./modules/users-administration/users-administration.module").then(
				(mod) => mod.UsersAdministrationModule
			),
	},
	{
		path: "",
		component: AdminLayoutComponent,
		children: [
			{
				path: "user",
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
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
