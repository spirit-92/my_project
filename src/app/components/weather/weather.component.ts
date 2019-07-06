import { Component, OnInit } from '@angular/core';
import {WeatherService } from "../../services/weather.service";
import { ListWeather } from "../../models/ListWeather";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})

export class WeatherComponent implements OnInit {
  weatherList: ListWeather[];
  weatherTitle:ListWeather[];

  constructor(
    public weather_service: WeatherService,
  ) {
  }

  ngOnInit() {
    this.weather_service.getWeather().subscribe((weather: ListWeather[]) => {
      console.log(weather)
      let weatherTitle=[];
      weather.forEach(function (item,index) {
        if (index === 0 ||index === 7||index === 15||index === 23||index === 31){
          weatherTitle.push(item)
        }
      });
      this.weatherTitle = weatherTitle;
    this.weatherList =  weather

    })

  }
}
