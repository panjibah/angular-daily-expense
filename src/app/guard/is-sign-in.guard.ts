import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {map, take} from 'rxjs/operators';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsSignInGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.userSubject.pipe(
        take(1),
        map( user => {
          // return !!user;
          const isAuth = !!user;
          if(isAuth) {
            this.router.navigate(['']);
            return false;
          }
          return true;
        }));
  }
  
}
