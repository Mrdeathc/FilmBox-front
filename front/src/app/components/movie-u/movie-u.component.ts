import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-u',
  templateUrl: './movie-u.component.html',
  styleUrls: ['./movie-u.component.css']
})
export class MovieUComponent implements OnInit {
  public peliculaActualizar: Movie;
  public imagenSubir: File;
  public videoSubir: File;
  public url: string;

  constructor(private movieService: MovieService){
    this.url = movieService.url
   }

  ngOnInit(): void {
    this.peliculaActualizar = JSON.parse(sessionStorage.getItem('movieU'));
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
  actualizarPelicula(){

    this.movieService.movieUpdate(this.peliculaActualizar._id, this.peliculaActualizar).subscribe(
      (response: any) => {
        if(response.updatedMovie){
          alert('La película ha sido actualizada correctamente!');
          sessionStorage.setItem('movieU', JSON.stringify(this.peliculaActualizar));
          this.movieService.uploadMovieImage(this.imagenSubir, this.peliculaActualizar._id).subscribe(
            (result: any) =>{
              this.peliculaActualizar.image = result.image;
            }
          );
          this.movieService.uploadMovieVideo(this.videoSubir, this.peliculaActualizar._id).subscribe(
            (result: any) =>{
              this.peliculaActualizar.link = result.link;
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