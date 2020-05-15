import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent implements OnInit {

  @Input() public datas: any[];
  @Input() public display_field: string = "name";

  private dataMatrix;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {

    const MAX_COLUMNS = 4;
    this.dataMatrix = this.listToMatrix(this.datas, MAX_COLUMNS)

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
