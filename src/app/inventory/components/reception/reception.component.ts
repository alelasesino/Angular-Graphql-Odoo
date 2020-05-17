import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss']
})
export class ReceptionComponent implements OnInit {

  headers = {name: 'Nombre', time: 'Hora'};
  data = [
    {name: 'Mi nombre', time: '05:00'},
    {name: 'Mi as', time: '06:00'},
    {name: 'Mi ff', time: '07:00'},
    {name: 'Mi aa', time: '08:00'},
    {name: 'Mi fffb', time: '09:00'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
