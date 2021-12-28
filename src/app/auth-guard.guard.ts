import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private _router: Router, private _auth :AuthenticationService) { }
  canActivate() {
  
    if(!(localStorage.getItem("isLoggedin") === "true")){
      this._router.navigate(['/manager/login'])
      return false;
    }else{
      return true;
    }
    
  }

}
