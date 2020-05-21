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

  /* 
  Comprueba si la cookie es una cookie HttpOnly
  */
  isLogged() {

    const cookie_name = "session_id";

    const d = new Date();
    d.setTime(d.getTime() + (1000));

    const expires = "expires=" + d.toUTCString();
    document.cookie = cookie_name + "=new_value;path=/;" + expires;

    return document.cookie.indexOf(cookie_name + '=') == -1;

  }

}
