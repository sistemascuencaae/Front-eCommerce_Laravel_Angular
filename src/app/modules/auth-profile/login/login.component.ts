import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: any = null;
  password: any = null;

  constructor(public authService: AuthService,
    public router: Router) {

  }

  ngOnInit(): void {
    if (this.authService.user && this.authService.token) {
      this.router.navigate(["/"]);
    }
  }

  login() {
    if (!this.email || !this.password) {
      alert("NECESITAS COLOCAR UN EMAIL Y UNA CONTRASEÑA");
      return;
    }

    this.authService.login(this.email, this.password).subscribe((resp: any) => {
      console.log(resp);

      //Si la respuesta en el servicio no tiene errores
      if (!resp.error && resp) {  //si la respuesta no tiene errores Y si la respuesta en verdadero
        //Todo salio bien y volver al home con su usuario autenticado
        document.location.reload();
      } else {
        if (resp.error.error == 'Unauthorized'
        || resp.error.message == 'Unauthenticated.') {
          console.log(resp);
          alert("EL USUARIO O CONTRASEÑA INGRESADO SON INCORRECTOS");
          return;
        }
      }
    })
  }

}
