import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'apollo-link';

@Component({
  selector: 'app-register-reception',
  templateUrl: './register-reception.component.html',
  styleUrls: ['./register-reception.component.scss']
})
export class RegisterReceptionComponent implements OnInit {

  headers = {code: 'Referencia', name: 'Articulo', quantity: 'Cantidad'};
  data = [
    {code: '4 KG GRANEL', name: 'Caja de granel', quantity: '251'},
    {code: '4 KG GRANEL', name: 'Caja de granel', quantity: '251'},
    {code: '4 KG GRANEL', name: 'Caja de granel', quantity: '251'},
    {code: '4 KG GRANEL', name: 'Caja de granel', quantity: '251'},
    {code: '4 KG GRANEL', name: 'Caja de granel', quantity: '251'},
    {code: '4 KG GRANEL', name: 'Caja de granel', quantity: '251'},
    {code: '4 KG GRANEL', name: 'Caja de granel', quantity: '251'},
    {code: '4 KG GRANEL', name: 'Caja de granel', quantity: '251'}
  ]

  state: any;

  constructor() { }

  ngOnInit() {

    console.log(window.history.state);

  }

}
