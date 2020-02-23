import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValidationApiService {

  constructor(
    private  http: HttpClient
  ) {
  }

  validatePassword(password: string): Observable<any> {
    return this.http.get<any>(`https://dc78fb6b.ngrok.io/user?password=${password}`);
  }

  validateEmail(email: string): Observable<any> {
    return this.http.get<any>(`https://dc78fb6b.ngrok.io/user?email=${email}`);
  }

  validateName(name: string): Observable<any> {
    return this.http.get<any>(`https://dc78fb6b.ngrok.io/user?name=${name}`);
  }

  saveUser(name: string, password: string, email: string): Observable<any> {
    return this.http.post<any>(`https://dc78fb6b.ngrok.io/registration`, {
      'name': name,
      'password': password,
      'email': email
    });
  }

  login(password: string, email: string): Observable<any> {
    return this.http.post<any>(`https://dc78fb6b.ngrok.io/registration`, {
      'password': password,
      'email': email
    });
  }
}
