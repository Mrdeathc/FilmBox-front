// importamos las rutas de RouterModule y NgModule
// Destructuración, donde a partir de un paquete o modulo podemos obtener un Objeto  
// Esto con el fin de evitar hacer RouterModule Routes() - new Routes()
// El hijo siempre va estar al lado izquierdo del padre

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar los componentes de navegacion de nuestro app
import { ContentComponent } from './components/content/content.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PlayerComponent } from './components/player/player.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MovieCComponent } from './components/movie-c/movie-c.component';
import { MovieUComponent } from './components/movie-u/movie-u.component';
import { MovieRComponent } from './components/movie-r/movie-r.component';
import { UsersComponent } from './components/users/users.component';
import { UserUComponent } from './components/user-u/user-u.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { HomeComponent } from './components/home/home.component';
import { SerieUComponent } from './components/serie-u/serie-u.component';
import { SerieCComponent } from './components/serie-c/serie-c.component';
import { ContentSeriesComponent } from './components/content-series/content-series.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { SerieRComponent } from './components/serie-r/serie-r.component';
import { EpisodeRComponent } from './components/episode-r/episode-r.component';
import { EpisodeCComponent } from './components/episode-c/episode-c.component';
import { EpisodeUComponent } from './components/episode-u/episode-u.component';
import { PlanesComponent } from './planes/planes.component';
import { PagoComponent } from './pago/pago.component';

// Crearemos una constante cuyo valor será una instancia del objete Routes
// que tendrá un arreglo de las rutas de navegación
const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'FilmBox', component: ContentComponent},
    {path: 'resultado', component: BusquedaComponent},
    {path: 'content-peliculas', component: ContentComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'registro', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'player', component: PlayerComponent},
    {path: 'pelicula-nueva', component: MovieCComponent},
    {path: 'ver-pelicula', component: MovieRComponent},
    {path: 'actualizar-pelicula', component: MovieUComponent},
    {path: 'usuarios', component: UsersComponent},
    {path: 'actualizar-usuario', component: UserUComponent},
    {path: 'serie-editar', component: SerieUComponent},
    {path: 'serie-crear', component: SerieCComponent},
    {path: 'content-series', component: ContentSeriesComponent},
    {path: 'planes', component: SubscribeComponent},
    {path: 'serie-leer', component: SerieRComponent},
    {path: 'episode-leer', component: EpisodeRComponent},
    {path: 'episode-crear', component: EpisodeCComponent},
    {path: 'episode-editar', component: EpisodeUComponent},
    {path: 'premium', component: PlanesComponent},
    {path: 'pago', component: PagoComponent}

    //{path: '**', component: ErrorComponent} para que funcione se debe crear el componente Error
];

// Vamos a importar y exportar el ruteo en el decorador NgModule
@NgModule({
    // imports: [RouterModule.forRoot(routes, {
    //     onSameUrlNavigation: 'reload'
    //   })],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
