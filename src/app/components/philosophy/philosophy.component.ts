import {Component, ElementRef, OnInit, ViewChild,Input} from '@angular/core';
import {PhilosophyService} from '../../services/philosophy.service';
import {UserAllModel} from '../../models/UserModel';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-philosophy',
  templateUrl: './philosophy.component.html',
  styleUrls: ['./philosophy.component.css']
})
export class PhilosophyComponent implements OnInit {
  users: UserAllModel[];

  local = environment.api_url_my + '/storage/';
  philosophyActiveCard:number=0;
  customOptions: any = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
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
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  };


  constructor(
    private philosophyHttp: PhilosophyService
  ) {
  }

  ngOnInit() {
    this.philosophyHttp.getAllUser().subscribe((res: UserAllModel[]) => {
        this.users = res;
      });
  }


  toggleCard(index) {
    this.philosophyActiveCard = index
  }





}
