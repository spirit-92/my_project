import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private apiUrl = environment.api_url_my;
  private token = localStorage.getItem('token');

  constructor(
    private  http: HttpClient
  ) {
  }

  getMusic(): Observable<any[]> {
    const header = new HttpHeaders({
      'token': this.token,
      'Content-Type': 'application/json',
    });
    return this.http.get<any[]>(`${this.apiUrl}/allMusic`, {headers: header});
  }

  saveMusic(music): Observable<any> {
    const header = new HttpHeaders({
      'token': this.token,
    });
    return this.http.post<any[]>(`${this.apiUrl}/saveMusic`, music, {
      headers: header,
      reportProgress: true,
      observe:'events'
    });
  }
  saveUserMusic(title:string):Observable<any>{
    const headers = new HttpHeaders({
      'token': this.token,
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.apiUrl}/saveUserMusic`,{
      'title' : title,
    },{headers})
  }
  getFavoriteMusic():Observable<any[]>{
    const header = new HttpHeaders({
      'token': this.token,
      'Content-Type': 'application/json',
    });
    return  this.http.get<any[]>(`${this.apiUrl}/getFavoriteMusic`, {headers: header});
  }
  deleteFavoriteMusic(title):Observable<any>{
    const header = new HttpHeaders({
      'token': this.token,
      'Content-Type': 'application/json',
    });
    return  this.http.delete<any>(`${this.apiUrl}/deleteFavoriteMusic?title=${title}`,{headers: header});
  }
}
