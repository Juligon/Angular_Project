import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { UserListComponent } from "./modules/user-administration/user-list/user-list.component";
import { UserDetailComponent } from "./modules/user-administration/user-detail/user-detail.component";
import { AdminLayoutComponent } from "./shared/admin-layout/admin-layout/admin-layout.component";

const routes: Routes = [
	{ path: "", redirectTo: "layout", pathMatch: "full" },
	// { path: 'list', component: UserListComponent },
	// { path: 'detail', component: UserDetailComponent },
	{
		path: "user",
		loadChildren: () =>
			import("./modules/user-administration/user-administration.module").then(
				(mod) => mod.UserAdministrationModule
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
						"./modules/user-administration/user-administration.module"
					).then((mod) => mod.UserAdministrationModule),
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
