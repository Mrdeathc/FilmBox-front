import { Component, OnInit } from '@angular/core';
import { Movie } from './../../models/movie';
import { MovieService } from './../../services/movie.service';
import { UserService } from '../../services/user.service';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

public movies : Movie[];
public url: String;
public identidad;
public publicidadOn: boolean;
public miBusqueda;
public myKey;
currentTime: number;
rerender = false;

  constructor(
    private movieService: MovieService,
    private userService: UserService,
    private _router: Router,
    ) {
      this.url = movieService.url;
      this.miBusqueda='';
      this.myKey='title';
   }

  ngOnInit(): void {
    this.showMovies();
    this.identidad = this.userService.getIdentify();
  }

  showMovies(){
    this.movieService.movies().subscribe(
      (result: any) => {  
        this.movies=result.movies;
      }
    );
  }

  verMovie(movie){
    let movie_player=JSON.stringify(movie);
    localStorage.setItem('videoPlayer', movie_player);
    this._router.navigate(['ver-pelicula']);
  }
  buscar(){
    if(this.miBusqueda.length>0){
      this.movieService.searchMovies(this.myKey, this.miBusqueda).subscribe(
        (result: any) => { 
          if(result.foundMovies){
            let movies:Movie[]= result.foundMovies;
            sessionStorage.setItem('busqueda', `{"busqueda":"${this.miBusqueda}"}`);
            sessionStorage.setItem('resultado', JSON.stringify(movies));
            this.showMovies();
            this._router.navigate(['resultado']);
          } 
          else{
            let movies:Movie[]= [];
            sessionStorage.setItem('busqueda', `{"busqueda":"${this.miBusqueda}"}`);
            sessionStorage.setItem('resultado', JSON.stringify(movies));
            this.showMovies();
            this._router.navigate(['resultado']);
            //alert(result.message)
          }
        }
      );
    }
  }
  radioChange(data){
    this.myKey=data;
  }

  logout(){
    sessionStorage.clear();
    this._router.navigate(['login']);
  }
}