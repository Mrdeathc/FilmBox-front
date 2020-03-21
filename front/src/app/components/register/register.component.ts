import { Component, OnInit } from '@angular/core';
// Importamos el modelo y el servicio de Angular
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
// Para indicar que navegue a una ruta especifica vamos a
// Importar el objeto Router
import { Router, ActivatedRoute, Params} from '@angular/router';
// ActivatedRoute indica la ruta activa y Params  indica la ruta con parametros Ej. netflix/series/elite
// routerlink = '/series /:id ; src = [serie.nombre]
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  public identidad;
  public usuarioRegistro: User; //Creamos una variable cuyo valor será el modelo

  constructor(
    private userService : UserService,
    private _router : Router
  ) {
    this.usuarioRegistro = new User('','','','','','ROLE_USER','','',[]);
    //colocar '' vacio todos los campos que tengan en el modelo de Angular
   }

  ngOnInit(): void {
  }
  //vamos a crear el método de registrarUsuario()
  // Este método contendrá toda la lógica de guardar los datos del usuario,
  // conectarse al método registro del servicio y entre ambos comunicarse con la api y la BD
  registrarUsuario(){
    // En un console.log, vamos a imprimir los datos del usuario
    // que están llegando en la variable usuarioRegistro
    /*
    Acceder al servicio registro, enviando la variable usuarioRegistro y accedemos a
    un método del Observable que se llama suscribe para que el observable pueda recoger
    los datos que se están enviando y poder guardarlos en la BD.
    subcribe necesita un parámetro de tipo cualquier cosa: any
    */
   this.userService.createUser(this.usuarioRegistro).subscribe((response:any) => {
       let usuario = response.newUser;// reponse.ALGO => AlGO es el objeto que envía el back
       this.usuarioRegistro = usuario; // _id / nombre / apellido
       /*
       Validar a partir de la existencia del _id si se ha registrado o no 

       un nuevo usuario, es decir, si dentro de la respuesta (response.usuario)
       ya existe un _id nuevo, entonces se nos ha indicado que el usuario se ha
       registrado correctamente.
       */
      if(!this.usuarioRegistro._id){
        alert("Error al registrarse");
      } else{
        alert(`Registro exitoso!, inicia sesion con ${this.usuarioRegistro.email}`);
        // Indicar que limpie el modelo 
        this.usuarioRegistro = new User('','','','',null,'ROLE_USER','','',[]);
        // Redireccionamos al componente que deseemos
        this._router.navigate(['/login']);
      }
     },
     error =>{
       var errormensaje = <any>error;
       if(errormensaje != null){
         console.log(error);
       }
     } 
   );
  } // Cierre método registrarUsuario
}