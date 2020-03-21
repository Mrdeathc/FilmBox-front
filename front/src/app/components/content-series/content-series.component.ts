import { Component, OnInit } from '@angular/core';
import { Serie } from './../../models/serie';
import { SerieService } from './../../services/serie.service';
import { UserService } from '../../services/user.service';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-content-series',
  templateUrl: './content-series.component.html',
  styleUrls: ['./content-series.component.css']
})
export class ContentSeriesComponent implements OnInit {

public series : Serie[];
public url: String;
public identidad;
currentTime: number;
rerender = false;

  constructor(
    private serieService: SerieService,
    private userService: UserService,
    private _router: Router,
    ) {
      this.url = serieService.url;
   }

  ngOnInit(): void {
    this.showSeries();
    this.identidad = this.userService.getIdentify();
  }

  showSeries(){
    this.serieService.series().subscribe(
      (result: any) => {  
        this.series=result.series;
      }
    );
  }

  ver(serie){
    let serie_player=JSON.stringify(serie);
    localStorage.setItem('seriePlayer', serie_player);
    this._router.navigate(['serie-leer']);
  }

  editar(serie){
    let serie_player=JSON.stringify(serie);
    sessionStorage.setItem('serieU', serie_player);
    this._router.navigate(['serie-editar']);
  }

  eliminar(serie){
    this.serieService.serieDelete(serie._id).subscribe(
      (result: any) => {  
        alert(result.deletedSerie.title+" eliminada.");
        this.ngOnInit();
        this._router.navigate(['content-series']);
      }
    );
  }

  logout(){
    sessionStorage.clear();
    this._router.navigate(['login']);
  }
}