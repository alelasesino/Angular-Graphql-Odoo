import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { InventoryService } from '../../services/inventory.service';
import { LotService } from '../../services/lot.service';

@Component({
  selector: 'app-origin-location',
  templateUrl: './origin-location.component.html',
  styleUrls: ['./origin-location.component.scss']
})
export class OriginLocationComponent implements OnDestroy {

  @Output('origin') output = new EventEmitter<string>();

  private loading: boolean;
  private button_label: string = "Seleccionar ubicación origen";
  private sub;

  constructor(private lotService: LotService, private inventoryService: InventoryService, private modalService: NgbModal) { }

  openFincaModal(){

    this.loading = true;

    this.sub = this.inventoryService.getFarms().subscribe(async result => {

    this.loading = false;

      try {

        const farm = await this.openModal({title: 'Fincas', display_name: 'name'}, result.data.farms);
        const parcel = await this.openModal({title: 'Parcelas', display_name: 'name'}, farm.parcels);
        
        this.button_label = `${farm.name} - (${parcel.name})`;
        this.output.emit(this.lotService.getLot(farm.code, parcel.number));

      } catch(err) {}

    }, error => this.loading = false);

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
