import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-keypad-modal',
  templateUrl: './keypad-modal.component.html',
  styleUrls: ['./keypad-modal.component.scss']
})
export class KeypadModalComponent implements OnInit {

  @Input() public title: string;

  display_value: string = "0";
  is_firt_click: boolean = true;

  keypad: number[][] = [
    [7,8,9],
    [4,5,6],
    [1,2,3]
  ];

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  onNumberClick(number: string) {

    if(this.is_firt_click) {
      this.display_value = ""
      this.is_firt_click = false;
    }

    this.display_value = this.display_value.concat(number);
      
  } 

  onDeleteClick() {
    this.display_value = "0";
    this.is_firt_click = true;
  }

  onClose(){
    this.activeModal.close(Number(this.display_value));
  }

}
