import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {WeatherPost} from "../models/WeatherPost";
import {map} from "rxjs/operators";
import {ListWeather} from "../models/ListWeather";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = environment.api_key_Weather;
  private urlWeather = environment.api_url_Weather;

  constructor(
    private http: HttpClient
  ) { }

  getWeather(){
    return this.http.get(`${this.urlWeather}appid=${this.apiKey}`).pipe(
      map((res: WeatherPost): ListWeather[] => res.list)
    )
  }
}
