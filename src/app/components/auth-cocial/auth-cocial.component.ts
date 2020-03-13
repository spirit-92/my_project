import {Component, Input, OnInit, Output} from '@angular/core';
import {AuthService} from 'angularx-social-login';
import {FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login';
import {ValidationApiService} from '../../services/validation-api.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-auth-cocial',
  templateUrl: './auth-cocial.component.html',
  styleUrls: ['./auth-cocial.component.css']
})
export class AuthCocialComponent implements OnInit {
  private user:SocialUser;
  private loggedIn: boolean;
  @Input() AuthOrRegistration: boolean;


  constructor(
    private authService: AuthService,
    private http: ValidationApiService,
    public route: Router,
    public toast: ToastrService,
  ) {
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;

      this.loggedIn = (user != null);
    });
    console.log(this.user)
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(((userDate)=>{
      this.user = userDate;
      if (this.AuthOrRegistration) {
        if (this.loggedIn){
          this.http.authorise(userDate.id, userDate.email).subscribe(res =>{
            localStorage.setItem('token', res.token);
            this.http.emitUserEvent(res.token);
            this.toast.success('ok');
            this.route.navigate(['./']);
          },error => {
            console.log(error);
            if (error.error.errors.name) {
              this.toast.error(error.error.errors.name);
            }
            if (error.error.errors.email) {
              this.toast.error(error.error.errors.email);
            }
          })
        }
      } else {
        if (this.loggedIn) {
          this.http.saveUser(userDate.name, userDate.id, userDate.email, null, userDate.photoUrl).subscribe(res => {
            localStorage.setItem('token', res.token);
            this.http.emitUserEvent(res.token);
            this.toast.success('ok');
            this.route.navigate(['./']);
          }, error => {
            console.log(error);
            if (error.error.errors.name) {
              this.toast.error(error.error.errors.name);
            }
            if (error.error.errors.email) {
              this.toast.error(error.error.errors.email);
            }
          });
        }
      }
    }));


  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(((userDate)=>{
      this.user = userDate;
      if (this.AuthOrRegistration) {
        if (this.loggedIn){
          this.http.authorise(userDate.id, userDate.email).subscribe(res =>{
            localStorage.setItem('token', res.token);
            this.http.emitUserEvent(res.token);
            this.toast.success('ok');
            this.route.navigate(['./']);
          },error => {
            console.log(error);
            if (error.error.errors.name) {
              this.toast.error(error.error.errors.name);
            }
            if (error.error.errors.email) {
              this.toast.error(error.error.errors.email);
            }
          })
        }
      } else {
        console.log(this.user);
        if (this.loggedIn) {
          this.http.saveUser(userDate.name, userDate.id, userDate.email, null, userDate.photoUrl).subscribe(res => {
            localStorage.setItem('token', res.token);
            this.http.emitUserEvent(res.token);
            this.toast.success('ok');
            this.route.navigate(['./']);
          }, error => {
            console.log(error);
            if (error.error.errors.name) {
              this.toast.error(error.error.errors.name);
            }
            if (error.error.errors.email) {
              this.toast.error(error.error.errors.email);
            }
          });
        }
      }

    }));


  }

  signOut(): void {
    this.authService.signOut();
  }
}