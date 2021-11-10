import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:TokenService,private navctrl:NavController){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.auth.isAuthenticated()){
        if(this.istokenExpirado()){
          this.auth.logout();
          this.navctrl.navigateForward(['login']);
          return false;
        }
        return true;
    }
    this.navctrl.navigateForward(['/login'])
    return false;
  }
  istokenExpirado():boolean{
    let token=this.auth.token;
    let payload= this.auth.obtenerdatostoken(token);
    let now = new Date().getTime()/1000;
    if(payload.exp < now){
      return true;
    }
    return false;
  }
}
