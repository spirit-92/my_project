import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Track} from 'ngx-audio-player';
import {ToastrService} from 'ngx-toastr';
import {MusicService} from '../../services/music.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})

export class MusicComponent implements OnInit {
  @ViewChild('searchMusic', {static: false}) searchMusic: ElementRef;
  @ViewChild('realFile', {static: false}) realFile: ElementRef;
  @ViewChild('customButton', {static: false}) customButton: ElementRef;
  @ViewChild('customText', {static: false}) customText: ElementRef;
  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [5, 10, 15];
  msaapDisplayVolumeControls = true;
  titleSearch: string = '';
  // Material Style Advance Audio Player Playlist

  msaapPlaylist: Track[];
  local = environment.api_url_my;
  constructor(
    public toastr: ToastrService,
    private httpMusic: MusicService
  ) {
  }

  ngOnInit() {
    this.httpMusic.getMusic().subscribe((res:Track[]) =>{
      res.forEach(item =>{
        item.link = this.local+item.link
      });
      this.msaapPlaylist = res;
    })
  }



  onfocus() {
    this.searchMusic.nativeElement.placeholder = '';
  }
  focusout(){
    if (!this.searchMusic.nativeElement.value){
      this.searchMusic.nativeElement.placeholder = 'search Music'
    }
  }
  chooseFile() {
    this.getRealFile();
  }

  getRealFile() {
    if (this.realFile.nativeElement.value) {
      this.customText.nativeElement.innerHTML = this.realFile.nativeElement.value.match(
        /[\/\\]([\w\d\s\.\-\(\)]+)$/
      )[1];
    } else {
      this.customText.nativeElement.innerHTML = 'No music chosen, yet.';
    }
  }

  onSubmit() {
    if (this.realFile.nativeElement.files.length > 10) {
      this.toastr.error('аксимально загрузить можно 10 треков');
    } else {
      this.toastr.success('ok');
    }
  }
}
