import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MusicComponent} from './components/music/music.component';
import {NewsComponent} from './components/news/news.component';
import {WeatherComponent} from './components/weather/weather.component';
import {PhilosophyComponent} from './components/philosophy/philosophy.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {AuthGuard} from './auth.guard';
import {LoginComponent} from './components/login/login.component';


const routes: Routes = [
  {path: '', component: MusicComponent,canActivate:[AuthGuard]},
  {path: 'news', component: NewsComponent,canActivate:[AuthGuard]},
  {path: 'weather', component: WeatherComponent,canActivate:[AuthGuard]},
  {path: 'philosophy', component: PhilosophyComponent,canActivate:[AuthGuard]},
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
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
