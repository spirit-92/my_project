  import { Component, OnInit } from '@angular/core';
  import { Location } from "@angular/common";

  @Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
  })
  export class NavigationComponent implements OnInit {
  logo:string;
  bgNav:boolean;
  constructor(
    private location: Location
  ) {}

  ngOnInit() {
    if (this.location.path() === '/news') {
      this.logo = 'assets/img/nav-icon/news.svg';
      this.bgNav = false
    }
    else if (this.location.path() === '/weather'){
      this.logo = 'assets/img/nav-icon/weather.svg';
      this.bgNav = false
    }
    else if(this.location.path() === '/philosophy'){
      this.logo = 'assets/img/nav-icon/philosphy.svg';
      this.bgNav = true
    }
    else{
      this.logo = 'assets/img/nav-icon/music.svg';
      this.bgNav = false
    }
  }

    getIcon(icon){
      this.logo = icon;
      icon === 'assets/img/nav-icon/philosphy.svg' ? this.bgNav = true:this.bgNav = false
    }
  }


