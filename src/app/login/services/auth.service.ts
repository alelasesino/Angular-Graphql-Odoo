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

    const body = {
      "params":{
      login: username, //"alejperez99@hotmail.com",
      password, //"odoo",
      db: "NoDemoDB1"
      }
    };

    return this.http.post<any>(path, body).pipe(
      
      timeout(5000), catchError(err => {

        this.toast.showError("No se ha podido establecer conexión con el servidor", "Error Conexión");
        throw new Error('Error Connection'); 

      })

    );

  }

  isLogged() {

    return Boolean(localStorage.getItem('logged') || false);

  }

}
