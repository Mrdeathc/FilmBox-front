import { Component, OnInit } from '@angular/core';
import { Movie } from './../../models/movie';
import { MovieService } from './../../services/movie.service';
import { UserService } from '../../services/user.service';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-movie-r',
  templateUrl: './movie-r.component.html',
  styleUrls: ['./movie-r.component.css']
})
export class MovieRComponent implements OnInit {

public movie : Movie;
public url: String;
public identidad;
public imagePath;

  constructor(
    private movieService: MovieService,
    private userService: UserService,
    private _router: Router,
    ) {
      this.url = movieService.url;
   }

  ngOnInit(): void {
    this.identidad = this.userService.getIdentify();
    this.movie = JSON.parse(localStorage.getItem('videoPlayer'));
    this.imagePath = this.url + 'imagenPelicula/' + this.movie.image; 
  }

  player(movie){
    let movie_player=JSON.stringify(movie);
    localStorage.setItem('videoPlayer', movie_player);
    this._router.navigate(['player']);
  }

  editar(movie){
    let movie_player=JSON.stringify(movie);
    sessionStorage.setItem('movieU', movie_player);
    this._router.navigate(['actualizar-pelicula']);
  }

  eliminar(movie){
    this.movieService.movieDelete(movie._id).subscribe(
      (result: any) => {  
        alert(result.deletedMovie.title+" eliminada.");
      }
    );
    this._router.navigate(['content-peliculas']);
  }

  like(movie){
    this.userService.like(this.identidad._id, movie._id).subscribe(
      (result: any) => {  
        alert(result.message);
      }
    );
    this.userService.getUser(this.identidad._id).subscribe(
      (result: any) => {  
        let identidad=JSON.stringify(result.user);
        sessionStorage.setItem('session', identidad);
        this.identidad = this.userService.getIdentify();
        this._router.navigate(['ver-pelicula']);
      }
    );
    
  }

  unlike(movie){
    this.userService.unlike(this.identidad._id, movie._id).subscribe(
      (result: any) => {  
        alert(result.message);
      }
    );
    this.userService.getUser(this.identidad._id).subscribe(
      (result: any) => {  
        let identidad=JSON.stringify(result.user);
        sessionStorage.setItem('session', identidad);
        this.identidad = this.userService.getIdentify();
        this._router.navigate(['ver-pelicula']);
      }
    );  
  }
}