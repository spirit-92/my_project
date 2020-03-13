import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {ValidationApiService} from '../../services/validation-api.service';
import {Router} from '@angular/router';
import {ImageCroppedEvent} from 'ngx-image-cropper';


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
  imageChangedEvent: any = '';
  croppedImage: any = '';
  isUploadedFile =false;
  public errorEmail = [];
  public errorPassword = [];
  public errorName = [];
  public errorImg = [];
  public hide = true;
  @Input() AuthOrRegistration:boolean;

  //Validation
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  textFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(30)
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(
    public validPass: ValidationApiService,
    public route: Router,

  ) {}

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.route.navigate(['./']);
    }
    this.AuthOrRegistration = false
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

  uploadFile(event) {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    //Preview
    this.croppedImage = event.base64;
    //converting
    const fileBeforeCrop = this.imageChangedEvent.target.files[0];
  }

  dataURItoBlob(dataURI): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }


  onSubmit() {
    this.errorImg = [];
    if (this.croppedImage){
      const fileToUpload: File = new File([this.dataURItoBlob(this.croppedImage)], 'image');
      this.errorImg = [];
      const fb = new FormData;
      fb.append('image', fileToUpload);
      if (this.emailFormControl.status === 'VALID' && this.passwordFormControl.status === 'VALID' && this.textFormControl.status === 'VALID') {
        this.validPass.saveUser(this.textFormControl.value, this.passwordFormControl.value, this.emailFormControl.value, fb).subscribe(res => {
          localStorage.setItem('token', res.token);
          this.validPass.emitUserEvent(res.token);
          this.route.navigate(['./']);
        }, error => {
          error.error.errors.image.forEach(error => {
            this.errorImg.push(error);
          });
        });
      }
    }else {
      this.errorImg.push(['save img']);
    }
  }

}
