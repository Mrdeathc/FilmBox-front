import { Component, OnInit } from '@angular/core';
import { User } from './../../models/user';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

public users : User[];
public url: String;
public identidad;

  constructor(
    private userService: UserService,
    private _router: Router
    ) {
      this.url = userService.url;
   }

  ngOnInit(): void {
    this.showUsers();
    this.identidad = this.userService.getIdentify();
  }

showUsers(){
  this.userService.getUsers().subscribe(
    (result: any) => {  
      this.users=result.users;
    }
  );
}

editar(user){
  let user_edit=JSON.stringify(user);
  sessionStorage.setItem('userU', user_edit);
  // let imagen_path = this.url + 'imagenUsuario/' + user.image;
  // document.getElementById("user-name").innerHTML,user.name);
  // document.getElementById("user-password").innerHTML=user.password;
  // document.getElementById("user-email").innerHTML=user.email;
  // document.getElementById("user-role").innerHTML=user.role;
  // document.getElementById("user-count").innerHTML=user.count;
  // document.getElementById("user-term").innerHTML=user.term;
  // document.getElementById("imgUsuario").setAttribute("src",imagen_path);
  this._router.navigate(['actualizar-usuario']);
}

eliminar(user){
  this.userService.userDelete(user._id).subscribe(
    (result: any) => {  
      alert(result.deletedUser.name+" eliminad@.");
      this.showUsers();
    }
  );
}

}