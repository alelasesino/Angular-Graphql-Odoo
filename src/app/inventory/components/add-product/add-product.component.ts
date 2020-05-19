import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { KeypadModalComponent } from '../keypad-modal/keypad-modal.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  private sub;
  private product;
  private quantity;
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
        const quantity = await this.openKeypad(product);

        this.product = product;
        this.quantity = quantity;

      } catch(err) {}

    });

  }

  openModal(config, data) {

    const modalRef = this.modalService.open(ModalContentComponent, {size: 'xl', centered: true});
    modalRef.componentInstance.config = config
    modalRef.componentInstance.datas = data

    return modalRef.result;

  }

  openKeypad(product) {

    const modalRef = this.modalService.open(KeypadModalComponent, {size: 'xl', centered: true});
    modalRef.componentInstance.product = product

    return modalRef.result;

  }

  ngOnDestroy(){

    if(this.sub)
      this.sub.unsubscribe();
      
  }

}
