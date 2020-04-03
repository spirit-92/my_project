import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserAllModel} from '../models/UserModel';
import {PhilosophyModel} from '../models/PhilosophyModel';

@Injectable({
  providedIn: 'root'
})
export class PhilosophyService {
  private apiUrlPhilosophy = environment.api_url_my;

  constructor(
    private  http: HttpClient
  ) {
  }

  getAllUser(): Observable<UserAllModel[]> {
    const header = new HttpHeaders({
      'token': localStorage.getItem('token'),
      'Content-Type': 'application/json',
    });
    return this.http.get<UserAllModel[]>(`${this.apiUrlPhilosophy}/getAllUser`, {headers: header});
  }

  savePhilosophyUser(image: any = null): Observable<any> {
    const header = new HttpHeaders({
      'token': localStorage.getItem('token'),
    });
    return this.http.post<any>(`${this.apiUrlPhilosophy}/savePhilosophy`, image, {
      headers: header,
      reportProgress: true,
      observe: 'events'
    });
  }

  philosophyList(email): Observable<PhilosophyModel> {
    const header = new HttpHeaders({
      'token': localStorage.getItem('token'),
    });
    return this.http.get<PhilosophyModel>(`${this.apiUrlPhilosophy}/getPhilosophy?email=${email}`, {headers: header});
  }

  philosophyUpdate(id, title, body): Observable<any> {
    const header = new HttpHeaders({
      'token': localStorage.getItem('token'),
    });
    return this.http.put<any>(`${this.apiUrlPhilosophy}/putPhilosophy`, {
      title: title,
      body: body,
      id: id
    }, {headers: header});
  }

  philosophySaveFavorite(philosophy_id): Observable<any> {
    const header = new HttpHeaders({
      'token': localStorage.getItem('token'),
    });
    return this.http.post<any>(`${this.apiUrlPhilosophy}/saveFavoritePhilosophy`, {
      'philosophy_id': philosophy_id
    }, {headers: header});

  }

  philosophyDelete(id): Observable<any> {
    const header = new HttpHeaders({
      'token': localStorage.getItem('token'),
    });
    return this.http.delete<any>(`${this.apiUrlPhilosophy}/deletePhilosophy?philosophy_id=${id}&id=${id}`, {headers: header});
  }
}
