import { Component, OnInit } from '@angular/core';
import { Movie } from './../../models/movie';
import { MovieService } from './../../services/movie.service';
import { UserService } from '../../services/user.service';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  
  public movie : Movie;
  public url: String;
  public identidad;
  public publicidadOn: boolean;
  public currentTime: number;
  public imagePath;
  public videoPath;
  
    constructor(
      private movieService: MovieService,
      private userService: UserService,
      private _router: Router
      ) {
        this.url = movieService.url;
     }
  
    ngOnInit(): void {
      this.identidad = this.userService.getIdentify();
      this.movie = JSON.parse(localStorage.getItem('videoPlayer'));
      this.imagePath = this.url + 'imagenPelicula/' + this.movie.image; 
      this.videoPath = this.url + 'videoPelicula/' + this.movie.link; 
    }
  
  setCurrentTime(data){
    
      if(data.target.currentTime>120 || data.target.paused){
        if(this.identidad.role=='ROLE_USER' && this.identidad.count=='COUNT_BASIC'){
          this.publicidadOn=false; 
          this.showPublicidad();
        }
      }
  }
  
  showPublicidad(){
    if(this.identidad.count=="COUNT_BASIC" && this.identidad.role=="ROLE_USER"){
      if(!this.publicidadOn){
        this.publicidadOn=true; 
        let publicidad_path = this.url + 'videoPelicula/SBDaXUm15_uDAWMSHNAjbH6i.mp4';
        document.getElementById("player-src").setAttribute("src",publicidad_path);
        (document.getElementById("player")as any).load();
        (document.getElementById("player")as any).play();
      }
      else{
        this._router.navigate(['perfil']);
      }
    }
  }
}