import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})


// export class authGuard implements CanActivateFn {
export class authGuard {

  constructor(public authService: AuthService,
    public router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return true;

    //Si no tiene usuario y token 
    if (!this.authService.user && !this.authService.token) {
      this.router.navigate(["auth/login"]);
      return false; //False no debe permitir el acceso
    }
    let token = this.authService.token;
    let expiracion = (JSON.parse(atob(token.aplit('.')[1]))).exp; //Ver si esta expirado el token

    if(Math.floor((new Date).getTime()/1000) >= expiracion){
      this.authService.logout();
      return false;
    }
    return true;
  }
}



// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };
