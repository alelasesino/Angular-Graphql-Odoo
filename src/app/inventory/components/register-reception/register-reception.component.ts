import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'apollo-link';

@Component({
  selector: 'app-register-reception',
  templateUrl: './register-reception.component.html',
  styleUrls: ['./register-reception.component.scss']
})
export class RegisterReceptionComponent implements OnInit {

  headers = {name: 'Nombre', time: 'Hora'};
  data = [
    {name: 'Mi nombre', time: '05:00'},
    {name: 'Mi as', time: '06:00'},
    {name: 'Mi ff', time: '07:00'},
    {name: 'Mi aa', time: '08:00'},
    {name: 'Mi fffb', time: '09:00'}
  ]

  state: any;

  constructor() { }

  ngOnInit() {

    console.log(window.history.state);

  }

}
