import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserAllModel} from '../models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class PhilosophyService {
  private apiUrlPhilosophy = environment.api_url_my;
  constructor(
    private  http: HttpClient
  ) { }

  getAllUser():Observable<UserAllModel[]>{
    const header = new HttpHeaders({
      "token":localStorage.getItem('token'),
      "Content-Type":"application/json",
    });
    return this.http.get<UserAllModel[]>(`${this.apiUrlPhilosophy}/getAllUser`,{ headers: header })
  }
}
