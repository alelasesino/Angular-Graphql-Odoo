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

    this.auth.login(this.username, this.password).subscribe(result => {

      if('error' in result){
        this.error_message = "¡Usuario/Contraseña incorrecta!";
      } else {
        console.log(result);
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
