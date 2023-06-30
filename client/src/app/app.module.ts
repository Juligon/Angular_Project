import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UsersAdministrationModule } from "./modules/users-administration/users-administration.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./shared/shared.module";
import { AdminLayoutModule } from "./shared/admin-layout/admin-layout.module";
import { HttpClientModule } from "@angular/common/http";
import { BusesListComponent } from './modules/buses-administration/buses-list/buses-list.component';


@NgModule({
	declarations: [AppComponent, BusesListComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		UsersAdministrationModule,
		BrowserAnimationsModule,
		SharedModule,
		AdminLayoutModule,
		HttpClientModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}