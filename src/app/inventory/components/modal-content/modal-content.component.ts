import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent implements OnInit {

  @Input() public datas: object[];
  @Input() public config: object;

  private hasImage: boolean;

  constructor(private activeModal: NgbActiveModal) { 

    this.config = {
      title: 'Titulo',
      display_name: 'name'
    }

  }

  ngOnInit() {

    this.checkImage();

    const MAX_COLUMNS = 4;
    this.datas = this.listToMatrix(this.datas, MAX_COLUMNS);

  }

  private checkImage(){

    if(this.datas.length > 0) 
      this.hasImage = 'image' in this.datas[0]

  }

  private listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
  }

}
