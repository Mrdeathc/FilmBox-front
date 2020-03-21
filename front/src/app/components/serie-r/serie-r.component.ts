import { Component, OnInit } from '@angular/core';
import { Serie } from './../../models/serie';
import { SerieService } from './../../services/serie.service';
import { Episode } from './../../models/episode';
import { EpisodeService } from './../../services/episode.service';
import { UserService } from '../../services/user.service';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-serie-r',
  templateUrl: './serie-r.component.html',
  styleUrls: ['./serie-r.component.css']
})
export class SerieRComponent implements OnInit {

public serie: Serie;
public episodes : Episode[];
public url: String;
public identidad;

  constructor(
    private episodeService: EpisodeService,
    private userService: UserService,
    private _router: Router,
    ) {
      this.url = episodeService.url;
   }

  ngOnInit(): void {
    this.showEpisodes();
    this.identidad = this.userService.getIdentify();
    this.serie=JSON.parse(localStorage.getItem('seriePlayer'));
  }

  showEpisodes(){
    this.episodeService.episodes().subscribe(
      (result: any) => {  
        this.episodes=result.episodes;
        
      }
    );
  }

  ver(episode){
    let episode_player=JSON.stringify(episode);
    localStorage.setItem('episodePlayer', episode_player);
    this._router.navigate(['episode-leer']);
  }

  editar(episode){
    let episode_player=JSON.stringify(episode);
    sessionStorage.setItem('episodeU', episode_player);
    this._router.navigate(['episode-editar']);
  }

  eliminar(episode){
    this.episodeService.episodeDelete(episode._id).subscribe(
      (result: any) => {  
        alert(result.deletedEpisode.title+" eliminada.");
        this.ngOnInit();
        this._router.navigate(['serie-leer']);
      }
    );
  }

  logout(){
    sessionStorage.clear();
    this._router.navigate(['login']);
  }
}