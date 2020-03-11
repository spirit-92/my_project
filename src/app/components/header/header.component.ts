import {Component, OnInit} from '@angular/core';
import {ValidationApiService} from '../../services/validation-api.service';
import {UserModel} from '../../models/UserModel';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  adapNav: boolean = false;
  user: UserModel;
  local = environment.api_url_my + '/storage/';
  userToken: string;

  constructor(
    public http: ValidationApiService,
    public route: Router
  ) {}

  ngOnInit() {
    this.http.userEvent.subscribe((res: string) => {
      this.userToken = res;
      if (this.userToken || localStorage.getItem('token')) {
        this.http.getUser().subscribe((user: UserModel) => {
          this.user = user;
          }, error => {
          console.log(error);
        })
      }else {
        this.user = null;
      }
    })
  }

  LogOut() {
    localStorage.removeItem('token');
    this.http.emitUserEvent('');
    this.route.navigate(['./registration']);
  }
}

