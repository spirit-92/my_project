import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserModel} from '../models/UserModel';
@Injectable({
  providedIn: 'root'
})
export class ValidationApiService {
  private apiUrl =environment.api_url_my;

  constructor(
    private  http: HttpClient,
  ) {
  }

  validatePassword(password: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user?password=${password}`);
  }

  validateEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user?email=${email}`);
  }

  validateName(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user?name=${name}`);
  }
  getUserValid(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetUserValid?email=${email}`);
  }

  saveUser(name: string, password: string, email: string, image:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registration?name=${name}&password=${password}&email=${email}`,image);
  }
  authorise(password: string, email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authorise`, {
      'password': password,
      'email': email
    });
  }

  login(password: string, email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registration`, {
      'password': password,
      'email': email
    });
  }
  getUser(token:string):Observable<UserModel>{
    const header = new HttpHeaders({
      "token":token,
      "Content-Type":"application/json",
    });
    return this.http.get<UserModel>(`http://localhost:1111/userGet`, { headers: header })
  }

}
