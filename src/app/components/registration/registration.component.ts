import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
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
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public errorEmail = [];
  public errorPassword = [];
  public  errorName = [];
  //Validation
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  textFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(8)
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
      this.validPass.validateEmail(this.emailFormControl.value).subscribe(res => {
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
  name(){
    this.errorName= [];

    if (this.textFormControl.status === 'VALID') {
      this.validPass.validateName(this.textFormControl.value).subscribe(res => {
      },error => {
        if (error.status === 400) {
          error.error.errors.name.forEach(error => {
            this.errorName.push(error);
            // @ts-ignore
            this.textFormControl.status = "INVALID"
          });
        }
      });
    }

  }
  onSubmit() {
    if (this.emailFormControl.status==='VALID' && this.passwordFormControl.status === 'VALID' && this.textFormControl.status === 'VALID'){
      this.validPass.saveUser(this.textFormControl.value,this.passwordFormControl.value,this.emailFormControl.value).subscribe(res =>{
        localStorage.setItem('token',res.token);
        this.route.navigate(['./'])
      },error => {
        console.log(error)
      })
    }

  }

}
