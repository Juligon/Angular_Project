import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UserAdministrationModule } from "./modules/user-administration/user-administration.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./shared/shared.module";
import { AdminLayoutModule } from "./shared/admin-layout/admin-layout.module";
import { HttpClientModule } from "@angular/common/http";
import { BusListComponent } from './modules/bus-administration/bus-list/bus-list.component';


@NgModule({
	declarations: [AppComponent, BusListComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		UserAdministrationModule,
		BrowserAnimationsModule,
		SharedModule,
		AdminLayoutModule,
		HttpClientModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}