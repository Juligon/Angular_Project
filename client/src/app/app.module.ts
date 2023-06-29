import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UserAdministrationModule } from "./modules/user-administration/user-administration.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./shared/shared.module";
import { AdminLayoutModule } from "./shared/admin-layout/admin-layout.module";
import { HttpClientModule } from "@angular/common/http";
import { AdminTopbarComponent } from './admin-layout/components/admin-topbar/admin-topbar.component';

@NgModule({
	declarations: [AppComponent, AdminTopbarComponent],
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