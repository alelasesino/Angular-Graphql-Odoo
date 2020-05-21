import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  error_message: string;
  loading: boolean;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    
    this.validateFields();

    if(this.error_message == ""){
      this.sendLogin();
    }

  }

  sendLogin(){

    this.loading = true;

    this.auth.login(this.username, this.password).subscribe(({loading, error}) => {

      this.loading = loading;

      if(error){
        this.error_message = "¡Usuario/Contraseña incorrecta!";
      } else {
        localStorage.setItem('logged', 'true');
        this.router.navigate(['/menu']);
      }

    });

  }

  validateFields(){
    
    this.error_message = "";

    if(this.username == ""){
      this.error_message = "¡El usuario es un campo requerido!";
    } else if (this.password == ""){
      this.error_message = "¡La contraseña es un campo requerido!";
    }

  }

}
