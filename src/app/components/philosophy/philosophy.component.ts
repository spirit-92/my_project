import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PhilosophyService} from '../../services/philosophy.service';
import {UserAllModel} from '../../models/UserModel';
import {environment} from '../../../environments/environment';
import {NgxSpinnerService} from 'ngx-spinner';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpEventType} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {PhilosophyModel} from '../../models/PhilosophyModel';
import {ValidationApiService} from '../../services/validation-api.service';
import {PhilosophyListModel} from '../../models/PhilosophyListModel';

@Component({
  selector: 'app-philosophy',
  templateUrl: './philosophy.component.html',
  styleUrls: ['./philosophy.component.css']
})
export class PhilosophyComponent implements OnInit {
  users: UserAllModel[];
  @ViewChild('realFile', {static: false}) realFile: ElementRef;
  @ViewChild('customButton', {static: false}) customButton: ElementRef;
  @ViewChild('customText', {static: false}) customText: ElementRef;
  @ViewChild('searchUser', {static: false}) searchUser: ElementRef;
  progress = 0;
  showProgress = false;
  ulTrek;
  form: FormGroup;
  local = environment.api_url_my + '/storage/';
  philosophyActiveCard = 0;
  addPhilosophyForm: boolean = false;
  placeholder: boolean = false;
  listUserPhilosophy: PhilosophyModel;
  listUserPhilosophyAll: any;
  emailUser;
  customOptions: any = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      }
    },
    nav: true
  };
  lineActive = 0;
  dots: any;
  countActiveDots: number = 0;
  card: PhilosophyListModel;
  readMore = false;
  updateCard = false;
  copyAllUsers;

  constructor(
    public philosophyHttp: PhilosophyService,
    public getUser: ValidationApiService,
    private spinner: NgxSpinnerService,
    public toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(''),
      body: new FormControl(''),
    });
    this.spinner.show();
    this.philosophyHttp.getAllUser().subscribe((res: UserAllModel[]) => {
      this.users = res;
      this.copyAllUsers = res;
    }, error => {
      console.log(error);
      this.spinner.hide();
    });
    this.getUser.getUser().subscribe(res => {
      this.emailUser = res.user.email;
      this.philosophyList(this.emailUser);
    });
    this.spinner.hide();
  }

  placeholderCard() {
    this.placeholder = !this.placeholder;
    this.card = null;
  }

  toggleCard(index, user) {
    this.philosophyActiveCard = index;
    this.philosophyList(user.email);
    this.countActiveDots = 0;
  }

  togglePhilosophy(count) {
    this.lineActive = -1;
    this.countActiveDots = count;
    let sliceArr = this.listUserPhilosophyAll.filter(function(item, index) {
      if (count * 7 <= index) {
        return item;
      }
    });
    this.listUserPhilosophy.philosophy = sliceArr;
  }

  philosophyList(email) {
    this.lineActive = null;
    this.card = null;
    this.philosophyHttp.philosophyList(email).subscribe((res: PhilosophyModel) => {
      res.philosophy.reverse();
      this.listUserPhilosophy = res;
      this.listUserPhilosophyAll = res.philosophy;
      this.listUserPhilosophy.philosophy.length < 7 ? this.dots = [] : this.dots = new Array(Math.ceil(this.listUserPhilosophy.philosophy.length / 7));
    });
  }

  chooseFile() {
    this.getRealFile();
    this.realFile.nativeElement.files = null;
  }

  getRealFile() {
    if (this.ulTrek) {
      this.ulTrek.remove();
    }
    if (this.realFile.nativeElement.value) {
      this.ulTrek = document.createElement('ul');
      let li = document.createElement('li');
      li.innerText = this.realFile.nativeElement.files[0].name;
      this.ulTrek.appendChild(li);
      this.customText.nativeElement.appendChild(this.ulTrek);
    }

  }

  onSubmit() {
    const titleBody = {...this.form.value};
    const fb = new FormData;
    this.showProgress = true;
    fb.append('title', titleBody.title);
    fb.append('body', titleBody.body);
    if (this.realFile.nativeElement.files[0]) {
      fb.append('image', this.realFile.nativeElement.files[0], this.realFile.nativeElement.files[0].name);
    }
    this.philosophyHttp.savePhilosophyUser(fb).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = event.loaded / event.total * 100;
      } else if (event.type === HttpEventType.Response) {
        this.showProgress = false;
        this.philosophyList(this.emailUser);
        this.philosophyActiveCard = 0;
        this.philosophyActiveCard = 0;
        this.form.reset();
        this.toastr.success(event.body.status);
        if (this.ulTrek) {
          this.ulTrek.remove();
        }
      }
    }, error => {
      console.log(error);
      if (error.error.errors.title) {
        error.error.errors.title.forEach(error => {
          this.toastr.error(error);
        });
      }
      if (error.error.errors.body) {
        error.error.errors.body.forEach(error => {
          this.toastr.error(error);
        });
      }
      if (error.error.errors.image) {
        error.error.errors.image.forEach(error => {
          this.toastr.error(error);
        });
      }
      this.showProgress = false;
    });
  }

  cardCreate(philosophy: PhilosophyListModel, myIndex: number) {
    this.lineActive = myIndex;
    this.card = philosophy;
    this.placeholder = true;
  }

  onUpdateCard(idPhilosophy) {
    const Update = {...this.form.value};
    this.philosophyHttp.philosophyUpdate(idPhilosophy, Update.title, Update.body).subscribe(res => {
      if (res.update.title) {
        this.card.title = res.update.title;
        this.toastr.success('title update');
      }
      if (res.update.body) {
        this.card.body = res.update.body;
        this.toastr.success('body update');
      }
      this.updateCard = false;
    }, error => {
      if (error.error.status) {
        this.toastr.error(error.error.status);
      }
    });

  }

  toggleReadMore() {
    this.readMore = !this.readMore;
    this.updateCard = false;
  }

  savePhilosophy(card: PhilosophyListModel) {
    this.philosophyHttp.philosophySaveFavorite(card.philosophy_id).subscribe(res => {
      this.toastr.success(res.status);
    }, error => {
      this.toastr.error(error.error.status);
    });
  }

  deleteNews(card: PhilosophyListModel) {
    this.philosophyHttp.philosophyDelete(card.philosophy_id).subscribe(res => {
      this.toastr.success(res.status);
      this.listUserPhilosophy.philosophy = this.listUserPhilosophy.philosophy.filter(res => {
        return res.philosophy_id != card.philosophy_id;
      });
      this.card = null;
      this.lineActive = null;
    }, error => {
      this.toastr.error(error.error.status);
    });
  }

  searchUserF() {
    if (!this.searchUser.nativeElement.value.trim()) {
      this.users = this.copyAllUsers;
    }
    this.users = this.users.filter(res => {
      return res.user_name.toLowerCase().indexOf(this.searchUser.nativeElement.value.toLowerCase()) !== -1;
    });
    if (!this.users.length) {
      this.users = this.copyAllUsers;
    }

  }
}
