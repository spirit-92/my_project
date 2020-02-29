import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
    return this.http.get<PostNews>(`https://newsapi.org/v2/top-headlines?pageSize=100&country=${country}&category=${category}&apiKey=${this.apiKeyNews}`);
  }

  getNewstextQuery(text): Observable<PostNews> {
    return this.http.get<PostNews>(`https://newsapi.org/v2/top-headlines?pageSize=100&q=${text}&apiKey=${this.apiKeyNews}`);
  }
  saveNews(token:string,card):Observable<any>{
    const headers = new HttpHeaders({
      "token":token,
      "Content-Type":"application/json",
    });
    return this.http.post<any>(`http://localhost:1111/saveNews`,{
      'title' : card.title,
      'img' : card.urlToImage,
      "url" : card.url,
      'publish_news' : card.publishedAt,
      'author': card.author
    },{headers})
  }
}
