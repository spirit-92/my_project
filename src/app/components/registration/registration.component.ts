import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {ValidationApiService} from '../../services/validation-api.service';
import {Router} from '@angular/router';


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
  public errorName = [];
  public errorImg = [];
  public hide = true;
  selectedFile: File = null;

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
  fileFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(
    public validPass: ValidationApiService,
    public route: Router
  ) {

  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.route.navigate(['./']);
    }
  }

  password() {
    this.errorPassword = [];
    if (this.passwordFormControl.status === 'VALID') {
      this.validPass.validatePassword(this.passwordFormControl.value).subscribe(res => {
      }, error => {
        if (error.status === 400) {
          error.error.errors.password.forEach(error => {
            this.errorPassword.push(error);
            // @ts-ignore
            this.passwordFormControl.status = 'INVALID';
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
            this.emailFormControl.status = 'INVALID';
          });
        }
      });
    }
  }

  name() {
    this.errorName = [];

    if (this.textFormControl.status === 'VALID') {
      this.validPass.validateName(this.textFormControl.value).subscribe(res => {
      }, error => {
        if (error.status === 400) {
          error.error.errors.name.forEach(error => {
            this.errorName.push(error);
            // @ts-ignore
            this.textFormControl.status = 'INVALID';
          });
        }
      });
    }
  }

  onFileSelected(event) {
    this.selectedFile = <File> event.target.files[0];
  }

  onSubmit() {
    this.errorImg= [];
    const fb = new FormData;
    fb.append('image', this.selectedFile);
    if (this.emailFormControl.status === 'VALID' && this.passwordFormControl.status === 'VALID' && this.textFormControl.status === 'VALID') {
      this.validPass.saveUser(this.textFormControl.value, this.passwordFormControl.value, this.emailFormControl.value,fb).subscribe(res => {
        localStorage.setItem('token', res.token);
        this.route.navigate(['./']);
      }, error => {
        error.error.errors.image.forEach(error => {
          this.errorImg.push(error);
        })
      });
    }

  }

}
