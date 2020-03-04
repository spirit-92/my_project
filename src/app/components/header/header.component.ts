import {Component, OnInit} from '@angular/core';
import {ValidationApiService} from '../../services/validation-api.service';
import {UserModel} from '../../models/UserModel';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  adapNav: boolean = false;
  user: UserModel;
  local = environment.api_url_my + '/storage/';

  constructor(
    public http: ValidationApiService,
  ) {
  }

  ngOnInit() {
    let token = localStorage.getItem('token');
    this.http.getUser(token).subscribe((user: UserModel) => {
      this.user = user;
      console.log(this.local+this.user.user.avatar);
      }, error => {
      console.log(error);
    });

  }

}
