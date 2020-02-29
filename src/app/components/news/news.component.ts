import {Component, OnInit} from '@angular/core';
import {NewsService} from '../../services/news.service';
import {PostNews} from '../../models/PostNews';
import {ArticlesNews} from '../../models/ArticlesNews';
import {Countries} from '../../models/countries';
import {NgxSpinnerService} from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent implements OnInit {
  posts: ArticlesNews[];
  postsAll: ArticlesNews[];
  placeholder: boolean = false;
  notFound: boolean = false;
  lineActive: number;
  card: ArticlesNews;
  countries: Countries = {
    countryArr: [
      {
        country: 'Ukraine',
        code: 'ua'
      },
      {
        country: 'Russian',
        code: 'ru'
      },
      {
        country: 'Belarus',
        code: 'by'
      },
      {
        country: 'Poland',
        code: 'pl'
      },
      {
        country: 'Great Britain',
        code: 'gb'
      },
      {
        country: 'Germany',
        code: 'de'
      },
      {
        country: 'Georgia',
        code: 'ge'
      },
      {
        country: 'Italy',
        code: 'it'
      },
      {
        country: 'China',
        code: 'ch'
      },
    ]
  };
  countrySelect: string = 'ua';
  searchNews: string = 'Search news';
  countActiveDots: number = 0;
  categorySelect: string = 'science';
  count: any[];

  constructor(
    private spinner: NgxSpinnerService,
    public news_service: NewsService,
    public toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.spinner.show();
    this.news_service.getNews().subscribe((posts: PostNews) => {
      //создаем точки для пагинации
      this.count = new Array(Math.ceil(posts.articles.length / 7));
      // обрезаем текст
      posts = this.textClipping(posts);
      this.postsAll = posts.articles;
      this.posts = posts.articles;
      this.spinner.hide();
    }, (err) => {
      alert(err.error.code);
      this.spinner.hide();
    });

  }

  //Запрос на получение новостей по странам и категориям
  onSubmit() {
    this.news_service.getNewsCountryCategory(this.countrySelect, this.categorySelect).subscribe((posts: PostNews) => {
      console.log(posts);
      if (posts.articles.length === 0) {
        this.count = new Array(Math.ceil(posts.articles.length / 7));
        this.postsAll = posts.articles;
        this.posts = posts.articles;
        this.notFound = true;
      } else {
        //создаем точки для пагинации
        this.count = new Array(Math.ceil(posts.articles.length / 7));
        // обрезаем текст

        posts = this.textClipping(posts);
        this.postsAll = posts.articles;
        this.posts = posts.articles;
        this.notFound = false;
        this.toggleNews(0);
      }
    }, error1 => console.log(error1));

  }

  //Запрос на получение новостей по тексту
  onSubmitSearch() {
    this.news_service.getNewstextQuery(this.searchNews).subscribe((posts: PostNews) => {
      if (posts.articles.length === 0) {
        this.count = new Array(Math.ceil(posts.articles.length / 7));
        this.postsAll = posts.articles;
        this.posts = posts.articles;
        this.notFound = true;
      } else {
        //создаем точки для пагинации
        this.count = new Array(Math.ceil(posts.articles.length / 7));
        // обрезаем текст
        posts = this.textClipping(posts);
        this.postsAll = posts.articles;
        this.posts = posts.articles;
        this.notFound = false;
        this.toggleNews(0);
      }
    });

  }

  // пагинция постов
  toggleNews(count) {
    this.lineActive = -1;
    this.countActiveDots = count;
    const sliceArr = this.postsAll.filter(function(item, index) {
      if (count * 7 <= index) {
        return item;
      }
    });
    this.posts = sliceArr;
  }

//обрезка текста
  textClipping(posts: PostNews) {
    posts.articles.forEach(post => {
      if (post.title.length > 75) {
        post.title = post.title.split(' ').splice(0, 8).join(' ') + ' ...';
      }
    });
    return posts;
  }

  //создаем карточку
  cardCreate(card: ArticlesNews, lineActive: number) {
    this.lineActive = lineActive;
    this.placeholder = true;
    this.card = card;
  }

  placeholderCard() {
    this.placeholder = !this.placeholder;
    this.card = null;
  }

  saveNews(card) {
    this.toastr.success('Hello world!', 'Toastr fun!');
    this.news_service.saveNews(localStorage.getItem('token'), card).subscribe(res => {
      console.log(res);
      }, error => {
      console.log(error);
    });
  }
}
