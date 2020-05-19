import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { KeypadModalComponent } from '../keypad-modal/keypad-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  @Output('added') added_product = new EventEmitter<object>();

  private sub: Subscription;
  private loading: boolean;

  constructor(private inventoryService: InventoryService, private modalService: NgbModal) { }

  ngOnInit() {
  }

  openProductModal(){

    this.loading = true;

    this.sub = this.inventoryService.getProducts().subscribe(async result => {

      this.loading = false;

      try {
        
        const product = await this.openModal({title: 'Productos', display_name: 'code'}, result.data.products);
        const quantity = await this.openKeypad(product.display_name);

        product.quantity = quantity;

        if(quantity > 0)
          this.added_product.emit(product);

      } catch(err) {}

    });

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

}
