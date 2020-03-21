import { Component, OnInit } from '@angular/core';
import { Episode } from '../../models/episode';
import { EpisodeService } from '../../services/episode.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Serie } from 'src/app/models/serie';

@Component({
  selector: 'app-episode-c',
  templateUrl: './episode-c.component.html',
  styleUrls: ['./episode-c.component.css']
})
export class EpisodeCComponent implements OnInit {

  public episodioNuevo: Episode;
  public imagenSubir: File;
  public videoSubir: File;
  public serie: Serie;

  constructor(
    private episodeService: EpisodeService,
    private _router : Router
  ) { 
    this.episodioNuevo= new Episode('','','','','','','','','','');
  }

  ngOnInit(): void {
    this.serie = JSON.parse(localStorage.getItem('seriePlayer'));
    this.episodioNuevo.series=this.serie._id;
  }

  subirImagen(fileInput: any){
    this.imagenSubir = <File>fileInput.target.files[0];//evt.target.files; // FileList object
    // Loop through the FileList and render image files as thumbnails.
        var reader = new FileReader();

    reader.onload=function(){
          document.getElementById('imgThumb').innerHTML= '<img class="thumb" src="'+reader.result+
          '" title="'+fileInput.target.files[0].name+'"'+
          'style="height: 75px;border: 1px solid #000;margin: 10px 5px 0 0;"/>';
    }
    if (this.imagenSubir) {
      reader.readAsDataURL(this.imagenSubir);
    } else {
      document.getElementById('imgThumb').innerHTML='';
    }
  }

  subirVideo(fileInput: any){
    this.videoSubir = <File>fileInput.target.files[0];//evt.target.files; // FileList object
  }

  crearEpisodio(){
   this.episodeService.episodeCreate(this.episodioNuevo).subscribe((response:any) => {
       let episodio = response.newEpisode;// reponse.ALGO => AlGO es el objeto que envía el back
       this.episodioNuevo = episodio; // _id / nombre / apellido
       
      if(!this.episodioNuevo._id){
        alert("Error al crear: episodio");
      } else{
        this.episodeService.uploadEpisodeImage(this.imagenSubir, this.episodioNuevo._id).subscribe(
          (result: any) =>{
            this.episodioNuevo.image = result.image;
          }
        );
        this.episodeService.uploadEpisodeVideo(this.videoSubir, this.episodioNuevo._id).subscribe(
          (result: any) =>{
            this.episodioNuevo.link= result.link;
          }
        );
        alert(`Episodio creado con exito!`);
        this.episodioNuevo = new Episode('','','','','','','','','','');
        this._router.navigate(['/serie-leer']);
      }
     },
     error =>{
       var errormensaje = <any>error;
       if(errormensaje != null){
         console.log(error);
       }
     } 
   );
  }
}