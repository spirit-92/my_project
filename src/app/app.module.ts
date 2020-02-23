import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RoutingModule } from "./routing.module";
import { TranslateDaysPipe } from './pipes/translate-days.pipe';

//materiel
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

//*materiel
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MusicComponent } from './components/music/music.component';
import { NewsComponent } from './components/news/news.component';
import { WeatherComponent } from './components/weather/weather.component';
import { PhilosophyComponent } from './components/philosophy/philosophy.component';
import  { RegistrationComponent } from './components/registration/registration.component';
import { NewsService } from "./services/news.service";
import { MySlicePipe } from './pipes/my-slice.pipe';
import { TranslateMonthPipe } from './pipes/translate-month.pipe';
import { DegreeRoundingPipe } from './pipes/degree-rounding.pipe';
import { NumberRoundingPipe } from './pipes/number-rounding.pipe';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxAudioPlayerModule } from "ngx-audio-player";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SearchMusicPipe } from './pipes/search-music.pipe';
import { LoginComponent } from './components/login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    MusicComponent,
    NewsComponent,
    WeatherComponent,
    PhilosophyComponent,
    MySlicePipe,
    TranslateDaysPipe,
    TranslateMonthPipe,
    DegreeRoundingPipe,
    NumberRoundingPipe,
    SearchMusicPipe,
    RegistrationComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule,
    MatMenuModule,
    NgxSpinnerModule,
    NgxAudioPlayerModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [
    NewsService,

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
