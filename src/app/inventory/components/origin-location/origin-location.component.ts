import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-origin-location',
  templateUrl: './origin-location.component.html',
  styleUrls: ['./origin-location.component.scss']
})
export class OriginLocationComponent implements OnInit {

  private farm: any;
  private parcel: any;

  constructor(private inventoryService: InventoryService, private modalService: NgbModal) { }

  ngOnInit() {
  }

  openFincaModal(){

    this.inventoryService.getFarms().subscribe(async result => {

      try {

        const farm = await this.openModal({title: 'Fincas', display_name: 'name'}, result.data.farms);
        const parcel = await this.openModal({title: 'Parcelas', display_name: 'name'}, farm.parcels);
        
        this.farm = farm;
        this.parcel = parcel;

      } catch(err) {}

    });   //TODO DESUSCRIBIR ESTE SUBSCRIBER

  }

  openModal(config, data) {

    const modalRef = this.modalService.open(ModalContentComponent, {size: 'xl', centered: true});
    modalRef.componentInstance.config = config
    modalRef.componentInstance.datas = data

    return modalRef.result;

  }

}
