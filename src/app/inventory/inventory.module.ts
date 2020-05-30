import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { InventoryRoutingModule } from './inventory-routing.module';

import { ReceptionComponent } from './components/reception/reception.component';
import { ModalContentComponent } from './components/modal-content/modal-content.component';
import { OriginLocationComponent } from './components/origin-location/origin-location.component';
import { DataTableComponent, NgbdSortableHeader } from './components/data-table/data-table.component';
import { RegisterReceptionComponent } from './components/register-reception/register-reception.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { KeypadModalComponent } from './components/keypad-modal/keypad-modal.component';


@NgModule({
  declarations: [
    ReceptionComponent, 
    ModalContentComponent, 
    OriginLocationComponent, 
    DataTableComponent, 
    NgbdSortableHeader, 
    RegisterReceptionComponent, 
    AddProductComponent, 
    SafeHtmlPipe, 
    KeypadModalComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  entryComponents:[ModalContentComponent, KeypadModalComponent]
})
export class InventoryModule { }
