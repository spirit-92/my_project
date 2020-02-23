import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {PostNews} from '../models/PostNews';
import {Observable} from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})

export class NewsService {
  private apiUrlNews = environment.api_url_News;
  private apiKeyNews = environment.api_key_News;

  constructor(
    private  http: HttpClient
  ) {
  }

  getNews(): Observable<PostNews> {
    return this.http.get<PostNews>(`${this.apiUrlNews}${this.apiKeyNews}`);
  }

  getNewsCountryCategory(country, category): Observable<PostNews> {
    return this.http.get<PostNews>(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${this.apiKeyNews}`);
  }

  getNewstextQuery(text): Observable<PostNews> {
    return this.http.get<PostNews>(`https://newsapi.org/v2/top-headlines?q=${text}&apiKey=${this.apiKeyNews}`);
  }
  getMyapi(): Observable<any> {
    return this.http.get<any>(`http://12c4e3ce.ngrok.io/user`);
  }
}
