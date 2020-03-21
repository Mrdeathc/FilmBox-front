import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HttpClient } from '@angular/common/http';

// Componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PlayerComponent } from './components/player/player.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ContentComponent } from './components/content/content.component';
import { MovieUComponent } from './components/movie-u/movie-u.component';
import { MovieCComponent } from './components/movie-c/movie-c.component';

// Sevicios
import { UserService } from './services/user.service';
import { MovieService } from './services/movie.service';
import { SerieService } from './services/serie.service';
import { EpisodeService } from './services/episode.service';
import { PerfilComponent } from './components/perfil/perfil.component';
import { UsersComponent } from './components/users/users.component';
import { UserUComponent } from './components/user-u/user-u.component';

import { Globals } from './globals';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SerieCComponent } from './components/serie-c/serie-c.component';
import { SerieUComponent } from './components/serie-u/serie-u.component';
import { EpisodeCComponent } from './components/episode-c/episode-c.component';
import { EpisodeUComponent } from './components/episode-u/episode-u.component';
import { ContentSeriesComponent } from './components/content-series/content-series.component';
import { MovieRComponent } from './components/movie-r/movie-r.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuhomeComponent } from './components/menuhome/menuhome.component';
import { MenusimpleComponent } from './components/menusimple/menusimple.component';
import { HomeComponent } from './components/home/home.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component'
import { SerieRComponent } from './components/serie-r/serie-r.component';
import { EpisodeRComponent } from './components/episode-r/episode-r.component';
import { PlanesComponent } from './planes/planes.component';
import { PagoComponent } from './pago/pago.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    LoginComponent,
    RegisterComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    PerfilComponent,
    MovieUComponent,
    MovieCComponent,
    UsersComponent,
    UserUComponent,
    SerieCComponent,
    SerieUComponent,
    EpisodeCComponent,
    EpisodeUComponent,
    ContentSeriesComponent,
    MovieRComponent,
    BusquedaComponent,
    MenuComponent,
    MenuhomeComponent,
    MenusimpleComponent,
    HomeComponent,
    SubscribeComponent,
    SerieRComponent,
    EpisodeRComponent,
    PlanesComponent,
    PagoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    MovieService,
    SerieService,
    EpisodeService,
    Globals,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }