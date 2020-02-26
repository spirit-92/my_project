// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url_News: 'https://newsapi.org/v2/top-headlines?country=ua&apiKey=',
  api_key_News: '44f01e38e1714de5a4cb0cae58567372',
  api_key_Weather:'fb0244af773b2ce6caae80d7e3385cde',
  api_url_Weather:'https://api.openweathermap.org/data/2.5/forecast?lat=51.30&lon=31.18&',
  api_url_my:'http://localhost:1111'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
