import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { KeypadModalComponent } from '../keypad-modal/keypad-modal.component';
import { Subscription } from 'rxjs';
import { LotService } from '../../services/lot.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  @Output('added') added_product = new EventEmitter<object>();

  private sub: Subscription;
  loading: boolean;

  constructor(private lotService: LotService, private inventoryService: InventoryService, private modalService: NgbModal) { }

  ngOnInit() {
  }

  openProductModal(){

    this.loading = true;

    this.sub = this.inventoryService.getFarmsAndProducts().subscribe(async result => {

      this.loading = false;

      try {
        
        const product = this.clone(await this.openModal({title: 'Productos', display_name: 'code'}, result.data.products));
        const quantity = await this.openKeypad(product.display_name);

        delete product.image
        product.quantity = quantity;

        if(quantity > 0) {

          if(product.categId == 6) {

            const farm = await this.openModal({title: 'Fincas', display_name: 'name'}, result.data.farms);
            const parcel = await this.openModal({title: 'Parcelas', display_name: 'name'}, farm.parcels);
            
            product.lot = this.lotService.getLot(farm.code, parcel.number);

          }
          
          this.added_product.emit(product);

        }

      } catch(err) {}

    }, error => this.loading = false);

  }

  openModal(config, data) {

    const modalRef = this.modalService.open(ModalContentComponent, {size: 'xl', centered: true});
    modalRef.componentInstance.config = config
    modalRef.componentInstance.datas = data

    return modalRef.result;

  }

  openKeypad(title) {

    const modalRef = this.modalService.open(KeypadModalComponent, {size: 'xl', centered: true});
    modalRef.componentInstance.title = title

    return modalRef.result;

  }

  ngOnDestroy(){

    if(this.sub)
      this.sub.unsubscribe();
      
  }

  private clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }

}
