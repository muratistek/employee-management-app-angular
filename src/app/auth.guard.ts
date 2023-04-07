import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const { routeConfig } = route;

    const { path } = routeConfig as Route;

    const userID = this.authService.currentUserID;

    if (userID) {
      if (path?.includes('signUp')) {
        this.router.navigate(['/'])
      }

      return true
    }
    else {
      if (path?.includes('employeeList')) {
        this.router.navigate(['/'])
      }
      else if (path?.includes('addEmployee')) {
        this.router.navigate(['/'])
      }
      else if (path?.includes('viewEmployee')) {
        this.router.navigate(['/'])
      }
      else if (path?.includes('signUp')) {
        return true
      }

      return false
    }
  }

}
