import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-movie-c',
  templateUrl: './movie-c.component.html',
  styleUrls: ['./movie-c.component.css']
})
export class MovieCComponent implements OnInit {

  public peliculaNueva: Movie;
  public imagenSubir: File;
  public videoSubir: File;

  constructor(
    private movieService: MovieService,
    private _router : Router
  ) { 
    this.peliculaNueva= new Movie('','','','','','','','');
  }

  ngOnInit(): void {
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


  CrearPelicula(){
   this.movieService.movieCreate(this.peliculaNueva).subscribe((response:any) => {
       let pelicula = response.newMovie;// reponse.ALGO => AlGO es el objeto que envía el back
       this.peliculaNueva = pelicula; // _id / nombre / apellido
       
      if(!this.peliculaNueva._id){
        alert("Error al crear: Pelicula");
      } else{
        this.movieService.uploadMovieImage(this.imagenSubir, this.peliculaNueva._id).subscribe(
          (result: any) =>{
            this.peliculaNueva.image = result.image;
          }
        );
        this.movieService.uploadMovieVideo(this.videoSubir, this.peliculaNueva._id).subscribe(
          (result: any) =>{
            this.peliculaNueva.image = result.image;
          }
        );
        alert(`Película ${this.peliculaNueva.title} creada con exito!`);
        this.peliculaNueva = new Movie('','','','','','','','');
        this._router.navigate(['/FilmBox']);
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