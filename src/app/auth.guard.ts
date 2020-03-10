import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ValidationApiService} from './services/validation-api.service';

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate {
  auth:boolean;
  constructor(
    private router: Router,
    private http:ValidationApiService
  ) {
    http.getUser(localStorage.getItem('token')).subscribe(res =>{
      this.auth = true
    },error => {
      this.auth = false
    })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth) {
      return true;
    } else {
      this.router.navigate(['/registration'], {
        queryParams: {
          auth: false
        }
      });
    }

  }

}
