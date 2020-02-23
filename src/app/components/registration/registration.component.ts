import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { NewsService } from "../../services/news.service";

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
    public news_service: NewsService
  ) {
  }

  ngOnInit() {

  }
  password(){
    if (this.passwordFormControl.status === 'VALID'){
      // console.log(this.passwordFormControl.value)
      this.news_service.getMyapi().subscribe(res => {
        console.log(res);
      });
    }
  }
  onSubmit(){
    console.log('sd')
  }
}
