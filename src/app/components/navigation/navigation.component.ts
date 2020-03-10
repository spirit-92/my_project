import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import {ValidationApiService} from '../../services/validation-api.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  logo: string;
  bgNav: boolean;

  constructor(
    private location: Location,
    public route: Router,
    private http: ValidationApiService
  ) {}

  ngOnInit() {
    if (this.location.path() === '/news') {
      this.logo = 'assets/img/nav-icon/news.svg';
      this.bgNav = false;
    } else if (this.location.path() === '/weather') {
      this.logo = 'assets/img/nav-icon/weather.svg';
      this.bgNav = false;
    } else if (this.location.path() === '/philosophy') {
      this.logo = 'assets/img/nav-icon/philosphy.svg';
      this.bgNav = true;
    }
    else if (this.location.path() === '/registration'){
      this.logo = 'assets/img/nav-icon/register.svg';
      this.bgNav = true;
    }
    else {
      this.logo = 'assets/img/nav-icon/music.svg';
      this.bgNav = false;
    }
  }

  getIcon(icon) {
    this.logo = icon;
    icon === 'assets/img/nav-icon/philosphy.svg' ? this.bgNav = true : this.bgNav = false;
  }
  LogOut(){
    localStorage.removeItem('token');
    this.http.emitUserEvent('');
    this.route.navigate(['./registration'])
  }
}


