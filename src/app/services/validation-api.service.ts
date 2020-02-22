import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ValidationApiService {

  constructor(
    private  http: HttpClient
  ) { }
  validatePassword(password:string): Observable<any> {
    return this.http.get<any>(`http://localhost:1111/user?password=${password}`);
  }

  validateEmail(email:string): Observable<any> {
    return this.http.get<any>(`http://localhost:1111/user?email=${email}`);
  }
  validateName(name:string): Observable<any> {
    return this.http.get<any>(`http://localhost:1111/user?name=${name}`);
  }
  saveUser(name:string,password:string,email:string): Observable<any> {
    return this.http.post<any>(`http://localhost:1111/registration`,{
      "name":name,
      "password":password,
      "email": email
    });
  }
}
