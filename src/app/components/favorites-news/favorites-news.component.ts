import {Component, ContentChild, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {NewsService} from '../../services/news.service';
import {ToastrService} from 'ngx-toastr';
import {FavoriteNews} from '../../models/FavoriteNews';

@Component({
  selector: 'app-favorites-news',
  templateUrl: './favorites-news.component.html',
  styleUrls: ['./favorites-news.component.css']
})

export class FavoritesNewsComponent implements OnInit {
  @ViewChildren('li') liRef: QueryList<ElementRef>;
  posts: FavoriteNews[];
  postsAll: FavoriteNews[];
  placeholder: boolean = false;
  notFound: boolean = false;
  lineActive: number;
  card: FavoriteNews;
  countActiveDots: number = 0;
  count: any[];

  constructor(
    private spinner: NgxSpinnerService,
    public news_service: NewsService,
    public toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.spinner.show();
    this.news_service.getFavoriteNews().subscribe((posts: FavoriteNews[]) => {
      //создаем точки для пагинации
      this.count = new Array(Math.ceil(posts.length / 7));
      if (posts.length<7){
        this.count=[]
      }
      // обрезаем текст
      posts = this.textClipping(posts);
      this.postsAll = posts;
      this.posts = posts;
      this.spinner.hide();
      if (posts.length === 0){
        this.count = new Array(Math.ceil(posts.length / 7));
        this.postsAll = posts;
        this.posts = posts;
        this.notFound = true;
      }
    }, (err) => {
      this.toastr.error(err.error.code);
      this.spinner.hide();
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
  textClipping(posts: FavoriteNews[]) {
    posts.forEach(post => {
      if (post.title.length > 75) {
        post.title = post.title.split(' ').splice(0, 8).join(' ') + ' ...';
      }
    });
    return posts;
  }

  //создаем карточку
  cardCreate(card: FavoriteNews, lineActive: number) {
    this.lineActive = lineActive;
    this.placeholder = true;
    this.card = card;
  }

  placeholderCard() {
    this.placeholder = !this.placeholder;
    this.card = null;
  }

  deleteNews(card) {
    this.news_service.deleteFavoriteNews(card.id).subscribe(res =>{
      this.card = null;
      if (this.liRef.length<7){
        this.count = []
      }
      this.liRef.forEach((li: ElementRef) => {
        if (li.nativeElement.classList.contains('line_news-active')) {
          li.nativeElement.remove();
        }
      });
      this.toastr.success('delete post')
    },error => {
      this.toastr.error('delete error')
    });

  }

}
