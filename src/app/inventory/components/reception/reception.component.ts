import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../modal-content/modal-content.component';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss']
})
export class ReceptionComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openFincaModal(){

    const modalRef = this.modalService.open(ModalContentComponent, { size: 'xl', centered: true });
    modalRef.componentInstance.display_field = "nombre"
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
