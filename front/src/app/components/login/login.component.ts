import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { MovieService } from '../../services/movie.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Globals } from './../../globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public identidad;
 // public canciones;
  public login: User;
  public session: boolean;

  constructor(
    private userService : UserService,
    private _router : Router,
    private globals : Globals
  ) { 
    this.login = new User('','','','','','ROLE_USER','','',[]);
    this.session= false;
   }

  ngOnInit(): void {
  }

  loginUsuario(){
    this.userService.userLogin(this.login).subscribe(
      (response:any) => {
        if(response.loguedUser){
          let usuario = response.loguedUser;
          this.login = usuario;
          if(this.login){
            let usuarioLogueado = new User(
              this.login._id,
              this.login.name,
              this.login.email,
              this.login.password,
              this.login.image,
              this.login.role,
              this.login.term,
              this.login.count,
              this.login.favorite
            ); 
          sessionStorage.setItem('session', JSON.stringify(usuarioLogueado));
           // Consumir el servicio de obtenerNombreUsuario()
          this.identidad = this.userService.getIdentify();          
          alert(`Hola ${this.identidad.name} !! Bienvenido@`);
          this.globals.session=true;
          if(this.identidad.count=="COUNT_PREMIUM"){
            this._router.navigate(['/']);  
          }
          else{
            this._router.navigate(['/perfil']);   
          }      
          }
        }
         else{
          alert(response.message);
        }
      }, error =>{
          if(error != null){
            console.log(error);
          }
      }
    ); // Cierre subscribe
  }
}