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
    return this.http.get<any>(`http://dc78fb6b.ngrok.io?password=${password}`);
  }

  validateEmail(email:string): Observable<any> {
    return this.http.get<any>(`http://dc78fb6b.ngrok.io?email=${email}`);
  }
  validateName(name:string): Observable<any> {
    return this.http.get<any>(`http://dc78fb6b.ngrok.io?name=${name}`);
  }
  saveUser(name:string,password:string,email:string): Observable<any> {
    return this.http.post<any>(`http://dc78fb6b.ngrok.io/registration`,{
      "name":name,
      "password":password,
      "email": email
    });
  }
}
