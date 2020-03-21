import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {

  public usuarioActualizar: User;
  public archivoSubir: File;
  public url: string;
  public identidad;

  // el constructor inicializa las variable en la lógica
  constructor(private userService: UserService){
    this.url = userService.url
   }

  // el ngOnInit inicializa los datos que quiero que el componente muestre al inicio de la vista
  // se puede hacer para que muestre todas las canciones o las favoritas cambiando la linea 29.
  ngOnInit(): void {
    this.usuarioActualizar = JSON.parse(sessionStorage.getItem('session'));
    this.identidad = this.userService.getIdentify();
  }

  //-------------------------------------------
  // Crear el método subirArchivo
  // Carga masiva de archivos recorreria el arreglo <FILE> en todas sus posiciones
  subirArchivo(fileInput: any){
    this.archivoSubir = <File>fileInput.target.files[0];//evt.target.files; // FileList object
    // Loop through the FileList and render image files as thumbnails.
    var reader = new FileReader();

    reader.onload=function(){
          document.getElementById('imgThumb').innerHTML= '<img class="thumb" src="'+reader.result+
          '" title="'+fileInput.target.files[0].name+'"'+
          'style="height: 75px;border: 1px solid #000;margin: 10px 5px 0 0;"/>';
    }
    if (this.archivoSubir) {
      reader.readAsDataURL(this.archivoSubir);
    } else {
      document.getElementById('imgThumb').innerHTML='';
    }
  }
  //-------------------------------------------
  // Crear el método actualizarUsuario
  actualizarUsuario(){

    this.userService.userUpdate(this.usuarioActualizar._id, this.usuarioActualizar).subscribe(
      (response: any) => {
        if(response.updatedUser){
          alert('Tus datos han sido actualizados correctamente!');
          sessionStorage.setItem('session', JSON.stringify(this.usuarioActualizar));
          //validar si existe una imagen
          if(!this.archivoSubir){
            alert('No hay ninguna imagen');
          }else{
            alert(`Tu imagen es ${this.archivoSubir.name}`);
            this.userService.uploadUserImage(this.archivoSubir, this.usuarioActualizar._id).subscribe(
              (result: any) =>{
                //guardar imagen en DB y localstorage
                this.usuarioActualizar.image = result.image;
                sessionStorage.setItem('session', JSON.stringify(this.usuarioActualizar));
                
                //-------------------------------------------------
                //mostrar imagen al usuario
                let rutaImagen = this.url + 'imagenUsuario/' + this.usuarioActualizar.image;
                document.getElementById('imgUsuario').setAttribute('src', rutaImagen);
                //-------------------------------------------------
              }
            );
          }
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
