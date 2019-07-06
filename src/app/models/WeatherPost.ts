import { ListWeather } from "./ListWeather";

export interface WeatherPost {
  city: {
    id: number,
    name: string,
    coord:
      {
        lon: number,
        lat: number
      },
    country: string,
    timezone: number
    cod: string,
    message: number,
    cnt: number,
  }
  list:ListWeather[]
}
