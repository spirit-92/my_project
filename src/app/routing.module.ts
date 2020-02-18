import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MusicComponent} from './components/music/music.component';
import {NewsComponent} from './components/news/news.component';
import {WeatherComponent} from './components/weather/weather.component';
import {PhilosophyComponent} from './components/philosophy/philosophy.component';
import {RegistrationComponent} from './components/registration/registration.component';


const routes: Routes = [
  {path: '', component: MusicComponent},
  {path: 'news', component: NewsComponent},
  {path: 'weather', component: WeatherComponent},
  {path: 'philosophy', component: PhilosophyComponent},
  {path: 'registration', component: RegistrationComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule {
}
