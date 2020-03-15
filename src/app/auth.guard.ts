import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ValidationApiService} from './services/validation-api.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {


  constructor(
    private router: Router,
    private http: ValidationApiService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return  this.checkLogin();
  }


  checkLogin():Observable<boolean> {
    return this.http.auth().pipe(
      map(res=>{
        if (res.user)
        {
          return true;
        }
        else{
          this.router.navigate(['/registration']);
          return false;
        }
      }
    ),catchError((err):Observable<boolean> => {
      this.router.navigate(['/registration']);
      return  new Observable().pipe(map(res =>{
          return false
        }));

      })
    )
  }


}
