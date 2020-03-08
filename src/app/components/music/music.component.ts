import {Component, OnInit, ViewChild, ElementRef, ViewChildren, AfterViewInit, QueryList} from '@angular/core';
import {Track} from 'ngx-audio-player';
import {ToastrService} from 'ngx-toastr';
import {MusicService} from '../../services/music.service';
import {environment} from '../../../environments/environment';
import {NgxSpinnerService} from 'ngx-spinner';
import {HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})

export class MusicComponent implements OnInit, AfterViewInit {
  @ViewChild('searchMusic', {static: false}) searchMusic: ElementRef;
  @ViewChild('realFile', {static: false}) realFile: ElementRef;
  @ViewChild('customButton', {static: false}) customButton: ElementRef;
  @ViewChild('customText', {static: false}) customText: ElementRef;
  @ViewChild('saveBtn', {static: false}) saveBtn: ElementRef;
  @ViewChild('bar', {static: false}) progressBar: ElementRef;

  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [5, 10, 15];
  msaapDisplayVolumeControls = true;
  titleSearch: string = '';
  // Material Style Advance Audio Player Playlist
  saveAudio = [];
  msaapPlaylist: Track[];
  local = environment.api_url_my;
  ulTrek;
  progress = 0;
  showProgress = false;

  constructor(
    public toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private httpMusic: MusicService
  ) {

  }

  ngOnInit() {
    // console.log(this.progressBar)
    this.spinner.show();
    this.httpMusic.getMusic().subscribe((res: Track[]) => {
      res.forEach(item => {
        item.link = this.local + '/' + item.link;
      });
      this.msaapPlaylist = res;
      this.spinner.hide();
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

  chooseFile() {
    this.getRealFile();
    this.saveAudio = [];
    this.realFile.nativeElement.files = null;
  }

  getRealFile() {
    if (this.ulTrek) {
      this.ulTrek.remove();
    }
    if (this.realFile.nativeElement.files.length < 11) {
      if (this.realFile.nativeElement.value) {
        this.ulTrek = document.createElement('ul');
        for (let i = 0; i < this.realFile.nativeElement.files.length; i++) {
          let li = document.createElement('li');
          li.innerText = this.realFile.nativeElement.files[i].name;
          this.ulTrek.appendChild(li);
          this.saveAudio.push(this.realFile.nativeElement.files[i]);
        }
        this.customText.nativeElement.appendChild(this.ulTrek);
      } else {
        this.customText.nativeElement.innerHTML = 'Save music';
      }
    } else {
      this.toastr.error('аксимально загрузить можно 10 треков');

    }

  }

  onSubmit() {
    this.showProgress = true;
    if (this.realFile.nativeElement.files.length > 10) {
      this.toastr.error('аксимально загрузить можно 10 треков');
      this.ulTrek.remove();
      return;
    } else {
      const fb = new FormData;
      for (let i = 0; i < this.saveAudio.length; i++) {
        fb.append('audio[]', this.saveAudio[i], this.saveAudio[i].name);
      }

      this.httpMusic.saveMusic(fb).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = event.loaded / event.total * 100;
        } else if (event.type === HttpEventType.Response) {
          this.showProgress = false;

          if (event.body.status.error) {
            event.body.status.error.forEach(error => {
              this.toastr.error(error);
            });
          }
          if (event.body.status.success) {
            event.body.status.success.forEach(success => {
              this.toastr.success(success);
            });
          }
          if (this.ulTrek) {
            this.ulTrek.remove();
          }
          this.ngOnInit();
        }
      }, error => {
        for (let i = 0; i < this.saveAudio.length; i++) {
          this.toastr.error(error.error.errors[`audio.${i}`][0], error.status);
        }
        if (this.ulTrek) {
          this.ulTrek.remove();
        }
      });
    }
  }

  ngAfterViewInit(): void {
    this.saveBtn.nativeElement.addEventListener('click', function(e) {
      if (e.target.classList.contains('saveMusic')) {
        console.log(e.path[2].cells[0].textContent);
      }
    });
  }
}
