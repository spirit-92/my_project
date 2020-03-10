import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Track} from 'ngx-audio-player';
import {ToastrService} from 'ngx-toastr';
import {MusicService} from '../../services/music.service';
import {environment} from '../../../environments/environment';
import {NgxSpinnerService} from 'ngx-spinner';
import {HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-favorite-music',
  templateUrl: './favorite-music.component.html',
  styleUrls: ['./favorite-music.component.css']
})
export class FavoriteMusicComponent implements OnInit, AfterViewInit {
  @ViewChild('searchMusic', {static: false}) searchMusic: ElementRef;
  @ViewChild('deleteBtn', {static: true}) deleteBtn: ElementRef;
  msaapDisplayTitle = false;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [5, 10, 15];
  msaapDisplayVolumeControls = true;
  titleSearch: string = '';
  // Material Style Advance Audio Player Playlist
  msaapPlaylist: Track[];
  local = environment.api_url_my;

  constructor(
    public toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private httpMusic: MusicService,
    public renderer: Renderer2
  ) {
  }

  ngOnInit() {
    this.spinner.show();
    this.httpMusic.getFavoriteMusic().subscribe((res: Track[]) => {
      if (res.length == 0) {
        this.toastr.error('dont have music');
      } else {
        res.forEach(item => {
          item.link = this.local + '/' + item.link;
        });
        this.msaapPlaylist = res;
        this.spinner.hide();
      }
    });
    this.spinner.hide();
  }

  onfocus() {
    this.searchMusic.nativeElement.placeholder = '';
  }

  focusout() {
    if (!this.searchMusic.nativeElement.value) {
      this.searchMusic.nativeElement.placeholder = 'search Music';
    }
  }

  deleteTrek(count) {
    console.log(this.msaapPlaylist);
    this.msaapPlaylist = this.msaapPlaylist.splice(count, 1);
    console.log(this.msaapPlaylist);
  }

  ngAfterViewInit(): void {
    this.renderer.listen(this.deleteBtn.nativeElement, 'dblclick', (event) => {
      if (event.target.tagName === 'TD') {
        this.httpMusic.deleteFavoriteMusic(event.target.textContent).subscribe(res =>{
          let text = event.target.textContent;
          let title;
          let playList = [];
          if (this.msaapPlaylist.length > 0) {
            this.msaapPlaylist.forEach(function(item, index) {
              title = item.title.split(' ').join('');
              text = text.split(' ').join('');
              if (title !== text) {
                playList.push(item);
              }
            });
            this.msaapPlaylist = playList;
          }
          this.toastr.success(res.status);
          event.target.disabled = false;

        },error => {
          this.toastr.error(error.error.status);
          event.target.disabled = false;
        });

      }
    });
  }
}
