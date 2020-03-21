import { Component, OnInit } from '@angular/core';
import { Serie } from '../../models/serie';
import { SerieService } from '../../services/serie.service';

@Component({
  selector: 'app-serie-u',
  templateUrl: './serie-u.component.html',
  styleUrls: ['./serie-u.component.css']
})
export class SerieUComponent implements OnInit {

  public serieActualizar: Serie;
  public imagenSubir: File;
  public url: string;

  constructor(private serieService: SerieService){
    this.url = serieService.url
   }

  ngOnInit(): void {
    this.serieActualizar = JSON.parse(sessionStorage.getItem('serieU'));
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
  //-------------------------------------------
  // Crear el método actualizarpelicula
  actualizarSerie(){

    this.serieService.serieUpdate(this.serieActualizar._id, this.serieActualizar).subscribe(
      (response: any) => {
        if(response.updatedSerie){
          alert('La serie ha sido actualizada correctamente!');
          sessionStorage.setItem('serieU', JSON.stringify(this.serieActualizar));
          this.serieService.uploadSerieImage(this.imagenSubir, this.serieActualizar._id).subscribe(
            (result: any) =>{
              this.serieActualizar.image = result.image;
            }
          );
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