import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { InventoryRoutingModule } from './inventory-routing.module';
import { ReceptionComponent } from './components/reception/reception.component';
import { ModalContentComponent } from './components/modal-content/modal-content.component';
import { OriginLocationComponent } from './components/origin-location/origin-location.component';
import { DataTableComponent, NgbdSortableHeader } from './components/data-table/data-table.component';


@NgModule({
  declarations: [ReceptionComponent, ModalContentComponent, OriginLocationComponent, DataTableComponent, NgbdSortableHeader],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    NgbModule
  ],
  entryComponents:[ModalContentComponent]
})
export class InventoryModule { }
