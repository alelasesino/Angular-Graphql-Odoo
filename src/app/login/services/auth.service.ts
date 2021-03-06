import { ToastService } from 'src/app/inventory/services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeout, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private toast: ToastService) { }

  login(username, password){

    const path = '/web/session/authenticate';

    const headers = {
      headers: {'Content-Type':'application/json; charset=utf-8'}
    }

    const body = {
      "params":{
      login: username, //"alejperez99@hotmail.com",
      password, //"odoo",
      db: "NoDemoDB1"
      }
    };

    return this.http.post<any>(path, body, headers);

  }

  isLogged() {

    return Boolean(localStorage.getItem('logged') || false);

  }

}
