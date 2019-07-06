export interface ListWeather {
  clouds: {
    all: number
  },
  dt: number,
  dt_txt: string,
  main: {
    grnd_level: number,
    humidity: number,
    pressure: number,
    sea_level: number,
    temp: number,
    temp_max: number,
    temp_kf: number
    temp_min: number, },
  weather: [
    {
      id: number,
      main: string,
      description: string,
      icon: string
    }
    ],

  wind:
    {
      speed: number,
      deg: number
    },
  sys: {
    pod: string
  },

}

