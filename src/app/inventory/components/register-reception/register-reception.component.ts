import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'apollo-link';
import { DataTableComponent } from '../data-table/data-table.component';

@Component({
  selector: 'app-register-reception',
  templateUrl: './register-reception.component.html',
  styleUrls: ['./register-reception.component.scss']
})
export class RegisterReceptionComponent implements OnInit {

  @ViewChild('table', {static : true}) table: DataTableComponent;

  private loading: boolean;
  private headers: object = {code: 'Referencia', display_name: 'Articulo', quantity: 'Cantidad'};
  private data = [
    {id: 1, code: '4 KG GRANEL', display_name: 'Caja de granel1', quantity: '251'},
    {id: 2, code: '4 KG GRANEL', display_name: 'Caja de granel2', quantity: '251'},
    {id: 3, code: '4 KG GRANEL', display_name: 'Caja de granel3', quantity: '251'}
  ]

  state: any;

  constructor() { }

  ngOnInit() {

    //console.log(window.history.state);

  }

  onAddedProduct(product){
    this.table.addItem(product);
  }

  confirmReception(){}

}
