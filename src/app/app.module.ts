import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RoutingModule } from "./routing.module";
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
import { NewsService } from "./services/news.service";
import { MySlicePipe } from './pipes/my-slice.pipe';
import { HeightBgDirective } from './directives/height-bg.directive';



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
    HeightBgDirective,

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
    MatMenuModule
  ],
  providers: [
    NewsService,

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
