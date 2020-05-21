import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username, password){

    const path = '/web/session/authenticate';

    const body = {
      "params":{
      "login": username, //"alejperez99@hotmail.com",
      "password": password, //"odoo",
      "db":"NoDemoDB1"
      }
    };

    return this.http.post<any>(path, body);

  }

  isLogged() {

    return Boolean(localStorage.getItem('logged') || false);

  }

}
