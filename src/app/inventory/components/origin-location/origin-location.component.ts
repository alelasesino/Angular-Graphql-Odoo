import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-origin-location',
  templateUrl: './origin-location.component.html',
  styleUrls: ['./origin-location.component.scss']
})
export class OriginLocationComponent implements OnInit, OnDestroy {

  public farm: any = "holi";
  public parcel: any = "hola";
  private loading: boolean;

  private sub;

  constructor(private inventoryService: InventoryService, private modalService: NgbModal) { }

  ngOnInit() {
  }

  openFincaModal(){

    this.loading = true;

    this.sub = this.inventoryService.getFarms().subscribe(async result => {

    this.loading = false;

      try {

        const farm = await this.openModal({title: 'Fincas', display_name: 'name'}, result.data.farms);
        const parcel = await this.openModal({title: 'Parcelas', display_name: 'name'}, farm.parcels);
        
        this.farm = farm;
        this.parcel = parcel;

      } catch(err) {}

    });

  }

  openModal(config, data) {

    const modalRef = this.modalService.open(ModalContentComponent, {size: 'xl', centered: true});
    modalRef.componentInstance.config = config
    modalRef.componentInstance.datas = data

    return modalRef.result;

  }

  ngOnDestroy(){

    if(this.sub)
      this.sub.unsubscribe();
      
  }

}
