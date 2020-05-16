import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../modal-content/modal-content.component';

@Component({
  selector: 'app-origin-location',
  templateUrl: './origin-location.component.html',
  styleUrls: ['./origin-location.component.scss']
})
export class OriginLocationComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openFincaModal(){

    const modalRef = this.modalService.open(ModalContentComponent, { size: 'xl', centered: true });
    modalRef.componentInstance.config = {'title': 'Fincas', 'display_name': 'name'}
    modalRef.componentInstance.datas = [
      {'nombre': 'ale'},
      {'nombre': 'manu'},
      {'nombre': 'lelazo'},
      {'nombre': 'lelazo'},
      {'nombre': 'lelazo'},
      {'nombre': 'lelazo'},
      {'nombre': 'lelazo'},{'nombre': 'nombre'},{'nombre': 'lelazo'},{'nombre': 'lelazo'}
    ]

    modalRef.result.then(result => console.log(result) , dismiss => {});

  }

}
