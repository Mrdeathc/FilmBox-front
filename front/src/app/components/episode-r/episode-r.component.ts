import { Component, OnInit } from '@angular/core';
import { Episode } from './../../models/episode';
import { EpisodeService } from './../../services/episode.service';
import { UserService } from '../../services/user.service';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';
import { Serie } from 'src/app/models/serie';

@Component({
  selector: 'app-episode-r',
  templateUrl: './episode-r.component.html',
  styleUrls: ['./episode-r.component.css']
})
export class EpisodeRComponent implements OnInit {
  
  public episode : Episode;
  public serie: Serie;
  public url: String;
  public identidad;
  public publicidadOn: boolean;
  public currentTime: number;
  public imagePath;
  public videoPath;
  
    constructor(
      private episodeService: EpisodeService,
      private userService: UserService,
      private _router: Router
      ) {
        this.url = episodeService.url;
     }
  
    ngOnInit(): void {
      this.identidad = this.userService.getIdentify();
      this.serie = JSON.parse(localStorage.getItem('seriePlayer'));
      this.episode = JSON.parse(localStorage.getItem('episodePlayer'));
      this.imagePath = this.url + 'imagenEpisodio/' + this.episode.image; 
      this.videoPath = this.url + 'videoEpisodio/' + this.episode.link; 
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
        this._router.navigate(['premium']);
      }
    }
  }
}