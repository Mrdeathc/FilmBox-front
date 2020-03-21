import { Component, OnInit } from '@angular/core';
import { User} from './../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-u',
  templateUrl: './user-u.component.html',
  styleUrls: ['./user-u.component.css']
})

export class UserUComponent implements OnInit {

  public url: string;
  public user;
  public identidad;

  constructor(private userService: UserService,){
      this.url = userService.url;
      this.user = new User('','','','','','','','',[]);
  }

  ngOnInit(): void {
    this.identidad = this.userService.getIdentify();
    var user = JSON.parse(sessionStorage.getItem('userU'));
      if(user){
          this.user = user;
        }else{
          this.user = new User('','','','','L-xaBo3li36rJB4HAx5trUQZ.jpg','','','',[]);
      }
  }

  actualizarUsuario(){

    this.userService.userUpdate(this.user._id, this.user).subscribe(
      (response: any) => {
        if(response.updatedUser){
          alert('El usuario ha sido actualizado correctamente!');
          sessionStorage.setItem('userU', JSON.stringify(this.user));
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