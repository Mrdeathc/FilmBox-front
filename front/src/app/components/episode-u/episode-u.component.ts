import { Component, OnInit } from '@angular/core';
import { Episode } from '../../models/episode';
import { EpisodeService } from '../../services/episode.service';

@Component({
  selector: 'app-episode-u',
  templateUrl: './episode-u.component.html',
  styleUrls: ['./episode-u.component.css']
})
export class EpisodeUComponent implements OnInit {

  public episodioActualizar: Episode;
  public imagenSubir: File;
  public videoSubir: File;
  public url: string;

  constructor(private episodeService: EpisodeService){
    this.url = episodeService.url
   }

  ngOnInit(): void {
    this.episodioActualizar = JSON.parse(sessionStorage.getItem('episodeU'));
  }
  subirImagen(fileInput: any){
    this.imagenSubir = <File>fileInput.target.files[0];//evt.target.files; // FileList object
    // Loop through the FileList and render image files as thumbnails.
    console.log(this.imagenSubir);
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
    console.log(this.videoSubir);
  }
  //-------------------------------------------
  // Crear el método actualizarpelicula
  actualizarEpisodio(){

    this.episodeService.episodeUpdate(this.episodioActualizar._id, this.episodioActualizar).subscribe(
      (response: any) => {
        if(response.updatedepisode){
          alert('La película ha sido actualizada correctamente!');
          sessionStorage.setItem('episodeU', JSON.stringify(this.episodioActualizar));
          this.episodeService.uploadEpisodeImage(this.imagenSubir, this.episodioActualizar._id).subscribe(
            (result: any) =>{
              this.episodioActualizar.image = result.image;
            }
          );
          this.episodeService.uploadEpisodeVideo(this.videoSubir, this.episodioActualizar._id).subscribe(
            (result: any) =>{
              this.episodioActualizar.link = result.link;
            }
          );
          //-----------------------------------------
        }else{
          alert('No fue posible actualizar tus datos');
        }
      }, error =>{
        if(error != null){
          console.log(error);
        }
      }
    );
  }
}