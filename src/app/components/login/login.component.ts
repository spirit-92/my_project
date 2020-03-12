import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {ValidationApiService} from '../../services/validation-api.service';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public errorEmail = [];
  public errorPassword = [];
  public  errorName = [];
  private userAuth: SocialUser;
  private loggedIn: boolean;
  //Validation
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(
    public validPass: ValidationApiService,
    public route: Router,
    public toast:ToastrService,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.validPass.getUser().subscribe(res =>{
      this.route.navigate(['./'])
    });
    this.authService.authState.subscribe((user) => {
      this.userAuth = user;
      this.loggedIn = (user != null);
    });
  }

  password() {
    this.errorPassword= [];
    if (this.passwordFormControl.status === 'VALID') {
      this.validPass.validatePassword(this.passwordFormControl.value).subscribe(res => {
      },error => {
        if (error.status === 400) {
          error.error.errors.password.forEach(error => {
            this.errorPassword.push(error);
            // @ts-ignore
            this.passwordFormControl.status = "INVALID"
          });
        }
      });
    }
  }

  email() {
    this.errorEmail = [];
    if (this.emailFormControl.status === 'VALID') {
      this.validPass.getUserValid(this.emailFormControl.value).subscribe(res => {
      }, error => {
        if (error.status === 400) {
          error.error.errors.email.forEach(error => {
            this.errorEmail.push(error);
            // @ts-ignore
            this.emailFormControl.status = "INVALID"
          });
        }
      });
    }
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);

  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  onSubmit() {
    if (this.emailFormControl.status === 'VALID' && this.passwordFormControl.status === 'VALID') {
      this.validPass.authorise(this.passwordFormControl.value, this.emailFormControl.value).subscribe(res => {
        localStorage.setItem('token', res.token);
        this.validPass.emitUserEvent(res.token);
        this.route.navigate(['./']);
      }, error => {
        this.toast.error(error)
        // console.log(error);
        this.errorPassword.push(error.error.body);
      });
    }

  }
}
