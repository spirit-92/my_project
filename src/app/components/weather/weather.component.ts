import { Component, OnInit } from '@angular/core';
import { WeatherService } from "../../services/weather.service";
import { ListWeather } from "../../models/ListWeather";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})

export class WeatherComponent implements OnInit {
  weatherList: ListWeather[];
  weatherTitle:ListWeather[];
  weatherActive:string;
  count:number=0;
  weatherActiveCard:number=0;
  weatherForDay:ListWeather[];
  contAdaptTitleCard:number=0;
  visibleButtonLeft:boolean=true;
  visibleButtonRight:boolean=true;
  constructor(
    private spinner: NgxSpinnerService,
    public weather_service: WeatherService,
  ) {
  }

  ngOnInit() {
    this.spinner.show();
    this.weather_service.getWeather().subscribe((weather: ListWeather[]) => {
      console.log(weather);
     this.weatherActive =  weather[0].dt_txt;
      let weatherTitle=[];
      weather.forEach(function (item,index) {
        if (index === 0 ||index === 8||index === 16||index === 24||index === 32){
          weatherTitle.push(item)
        }
      });
      this.weatherTitle = weatherTitle;
      this.weatherList =  weather;
      this.weatherForDay = weather.slice(0,8);
      this.spinner.hide();
    },(err) => {
      alert(err.error.code);
      this.spinner.hide();
    });
    if (this.contAdaptTitleCard === 0){
      this.visibleButtonLeft = false
    }
    else if(this.contAdaptTitleCard < 0){
      this.visibleButtonLeft = true
    }

  }

  getWeatherForDay(day:ListWeather,activeCard:number){
    this.weatherActiveCard = activeCard;
    let list = this.weatherList;
    this.weatherActive = day.dt_txt;
    this.count = activeCard*8;
    list = list.slice(this.count,this.count+8);
    this.weatherForDay = list;

    }
    scrollCard(count:number){
      this.contAdaptTitleCard +=count;
      if (this.contAdaptTitleCard === 0){
        this.visibleButtonLeft = false;
        this.visibleButtonRight = true;
      }
      else if(this.contAdaptTitleCard < 0){
        this.visibleButtonLeft = true;
        this.visibleButtonRight = false;
        }


    }
}
