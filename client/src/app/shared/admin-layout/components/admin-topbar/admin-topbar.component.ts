import { Component, EventEmitter, Output } from "@angular/core";

@Component({
	selector: "app-admin-topbar",
	templateUrl: "./admin-topbar.component.html",
	styleUrls: ["./admin-topbar.component.css"],
})
export class AdminTopbarComponent {

	@Output()
	expandedButton = new EventEmitter<boolean>();

	expanded = false;
	
	onClick() {
		this.expanded = !this.expanded;
		this.expandedButton.emit(this.expanded);
	}
}
