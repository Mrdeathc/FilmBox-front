import { Component, OnInit } from '@angular/core';
import { Movie } from './../../models/movie';
import { MovieService } from './../../services/movie.service';
import { UserService } from '../../services/user.service';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

public movies : Movie[];
public url: String;
public identidad;
public miBusqueda;
public myKey: String;

  constructor(
    private movieService: MovieService,
    private userService: UserService,
    private _router: Router,
    ) {
      this.url = movieService.url;
   }

  ngOnInit(): void {
    this.showMovies();
    this.identidad = this.userService.getIdentify();
    this.myKey='title';
  }

  showMovies(){
    let resultado=JSON.parse(sessionStorage.getItem('resultado'));
    if(resultado){
      this.miBusqueda=JSON.parse(sessionStorage.getItem('busqueda'));
      this.miBusqueda=this.miBusqueda.busqueda;
      this.movies=JSON.parse(sessionStorage.getItem('resultado'));
    }
  }

  verMovie(movie){
    let movie_player=JSON.stringify(movie);
    localStorage.setItem('videoPlayer', movie_player);
    this._router.navigate(['ver-pelicula']);
  }

 buscarX(data){
   this.miBusqueda=data;
   
   if(data.length>0){
    this.buscar();
   }
   else{
     this.miBusqueda='';
     let movies:Movie[]= [];
      sessionStorage.setItem('busqueda', `{"busqueda":"${this.miBusqueda}"}`);
      sessionStorage.setItem('resultado', JSON.stringify(movies));
      this.showMovies();
      this._router.navigate(['resultado']);
   }
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
          }
        }
      );
    }
  }
 
  radioChange(data){
    this.myKey=data;
    this.buscar();
  }

  logout(){
    sessionStorage.clear();
    this._router.navigate(['login']);
  }
}