import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Serie } from '../../models/serie';
import { SerieService } from '../../services/serie.service';

@Component({
  selector: 'app-serie-c',
  templateUrl: './serie-c.component.html',
  styleUrls: ['./serie-c.component.css']
})
export class SerieCComponent implements OnInit {

  public serieNueva: Serie;
  public imagenSubir: File;

  constructor(
    private serieService: SerieService,
    private _router : Router
  ) { 
    this.serieNueva= new Serie('','','','','','','');
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

  crearSerie(){
   this.serieService.serieCreate(this.serieNueva).subscribe((response:any) => {
       let serie = response.newSerie;// reponse.ALGO => AlGO es el objeto que envía el back
       this.serieNueva = serie; // _id / nombre / apellido
       
      if(!this.serieNueva._id){
        alert("Error al crear: serie");
      } else{
        this.serieService.uploadSerieImage(this.imagenSubir, this.serieNueva._id).subscribe(
          (result: any) =>{
            this.serieNueva.image = result.image;
          }
        );
        alert(`Serie creada con exito!`);
        this.serieNueva = new Serie('','','','','','','');
        this._router.navigate(['/content-series']);
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