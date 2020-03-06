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
  userToken: string;

  constructor(
    public http: ValidationApiService,
  ) {
  }

  ngOnInit(): void {
    this.http.userEvent.subscribe((res: string) => {
      this.userToken = res;
      if (this.userToken||localStorage.getItem('token')) {
        this.userToken = localStorage.getItem('token');
        this.http.getUser(this.userToken).subscribe((user: UserModel) => {
          this.user = user;
          }, error => {
          console.log(error);
        });
      }
    });


  }

}
