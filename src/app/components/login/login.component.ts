import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {ValidationApiService} from '../../services/validation-api.service';
import { Router } from '@angular/router';

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
    public route: Router
  ) {

  }

  ngOnInit() {
    if (localStorage.getItem('token')){
      this.route.navigate(['./'])
    }
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

  onSubmit() {
    if (this.emailFormControl.status === 'VALID' && this.passwordFormControl.status === 'VALID') {
      this.validPass.authorise(this.passwordFormControl.value, this.emailFormControl.value).subscribe(res => {
        localStorage.setItem('token', res.token);
        this.route.navigate(['./']);
      }, error => {
        console.log(error);
        this.errorPassword.push(error.error.body);
      });
    }

  }
}
