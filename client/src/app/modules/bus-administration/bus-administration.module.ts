import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusAdministrationRoutingModule } from './bus-administration-routing.module';
import { BusListComponent } from './bus-list/bus-list.component';


@NgModule({
  declarations: [
    BusListComponent
  ],
  imports: [
    CommonModule,
    BusAdministrationRoutingModule
  ]
})
export class BusAdministrationModule { }
