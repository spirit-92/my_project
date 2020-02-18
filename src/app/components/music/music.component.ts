import { Component, OnInit, ViewChild,ElementRef,AfterViewInit} from '@angular/core';
import { Track } from 'ngx-audio-player';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})

export class MusicComponent implements OnInit,AfterViewInit {
@ViewChild('searchMusic',{static:false}) searchMusic:ElementRef;
  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [5,10,15];
  msaapDisplayVolumeControls = true;
  titleSearch:string ='';
  // Material Style Advance Audio Player Playlist

  msaapPlaylist: Track[] = [
    {
      title: 'Радио тапок - All Star',
      link: 'assets/music/Радио тапок - All Star.mp3'
    },
    {
      title: 'Радио тапок - Demon',
      link: 'assets/music/Радио тапок - Demon.mp3'
    },
    {
      title: 'Радио тапок - Gorillaz(Fell good)',
      link: 'assets/music/Радио тапок - Gorillaz(Fell good).mp3'
    },
    {
      title: 'Радио тапок - Gorillaz-Clint Eastwood',
      link: 'assets/music/Радио тапок - Gorillaz-Clint Eastwood.mp3'
    },
    {
      title: 'Радио тапок - I Hate Everythink',
      link: 'assets/music/Радио тапок - I Hate Everythink.mp3'
    },
    {
      title: 'Радио тапок - Imagine Dragons',
      link: 'assets/music/Радио тапок - Imagine Dragons.mp3'
    },
    {
      title: 'Радио тапок - It\'s My Life',
      link: 'assets/music/Радио тапок - It\'s My Life.mp3'
    },
    {
      title: 'Радио тапок - Linkin Park(In The End)',
      link: 'assets/music/Радио тапок - Linkin Park(In The End).mp3'
    },
    {
      title: 'Радио тапок - Linkin Park(Numb)',
      link: 'assets/music/Радио тапок - Linkin Park(Numb).mp3'
    },
    {
      title: 'Радио тапок - Night Witches',
      link: 'assets/music/Радио тапок - Night Witches.mp3'
    },
    {
      title: 'Радио тапок - Pain - shut your mouth',
      link: 'assets/music/Радио тапок - Pain - shut your mouth.mp3'
    },
    {
      title: 'Радио тапок - Pain',
      link: 'assets/music/Радио тапок - Pain.mp3'
    },
    {
      title: 'Радио тапок - Radioactive',
      link: 'assets/music/Радио тапок - Radioactive.mp3'
    },
    {
      title: 'Радио тапок - Rammstein -Mein Herz Brennt',
      link: 'assets/music/Радио тапок - Rammstein -Mein Herz Brennt.mp3'
    },
    {
      title: 'Радио тапок - Rammstein(Sun)',
      link: 'assets/music/Радио тапок - Rammstein(Sun).mp3'
    },
    {
      title: 'Радио тапок - Rammstein(я жду)',
      link: 'assets/music/Радио тапок - Rammstein(я жду).mp3'
    },
    {
      title: 'Радио тапок - Ramstain(Amerika)',
      link: 'assets/music/Радио тапок - Ramstain(Amerika).mp3'
    },
    {
      title: 'Rammstein- Du Hast',
      link: 'assets/music/Rammstein- Du Hast.mp3'
    },
    {
      title: 'Радио тапок - Stressed Out',
      link: 'assets/music/Радио тапок - Stressed Out.mp3'
    },
    {
      title: 'Радио тапок - Witchcraft',
      link: 'assets/music/Радио тапок - Witchcraft.mp3'
    },
    {
      title: 'Радио тапок - Бог и Дьявол',
      link: 'assets/music/Радио тапок - Бог и Дьявол.mp3'
    },
    {
      title: 'Радио тапок - все мои друзья входят во вкус',
      link: 'assets/music/Радио тапок - все мои друзья входят во вкус.mp3'
    },
    {
      title: 'Радио тапок - Одинокий день',
      link: 'assets/music/Радио тапок - Одинокий день.mp3'
    },
    {
      title: 'Радио тапок -Металика',
      link: 'assets/music/Радио тапок -Металика.mp3'
    },
    {
      title: 'Би 2 - Легион',
      link: 'assets/music/Би 2 - Легион.mp3'
    },
  ];
  constructor() {}
  ngOnInit() {}
  ngAfterViewInit(){}

  onfocus(){
    this.searchMusic.nativeElement.placeholder=''
  }
}
