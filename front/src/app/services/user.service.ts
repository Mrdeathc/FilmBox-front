/* 
    Este archivo contendra la conexión o consumo de nuestra api y cada ruta a su vez traerá los datos
    que existan en nuestra base de datos
*/

// Importar librerias o modulos internos de Angular
// Injectable -> Nos va a permitir inyectar el servicio en toda la App de Angular o en un componente

import { Injectable } from '@angular/core';

// HttpClient -> Viene del modulo HttpHeaders Nos va a permitir enviar las peticiones a la api

import { HttpClient, HttpHeaders } from '@angular/common/http';

// Map -> Permite mapear un objeto(analiza un JSON y nos permite traer cada propiedad)

import { map } from 'rxjs/operators';

// Dentro de Angular existe un elemento llamado Observable, recoge las respuestas que se envian a un servidor

import { Observable } from 'rxjs';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class UserService {
    // Crear cada uno de los servicios que van a interactuar entre el front y el back
    
    // Crear una variable que guarde la ruta o URL de la api con la que nos queremos conectar
    // Aqui podemos conectarnos con las apis que queramos usar ej. google maps, etc.
    url = "http://localhost:4000/api/";
    // Crearemos una variable pública que nos permita reconocer al usuario para un local storage
    public person;

    /*
    Vamos a crear un constructor que nos permita inicializar los métodos 
    POST, PUT, GET, DELETE.
    A su vez crearemos una variable privada que guardará el objeto HttpClient,
    esto para poder tener acceso a los métodos especificados anteriormente.
    */

    constructor(
        private _http: HttpClient
    ){}

    // Ahora vamos a crear nuestro primer servicio. 
    //--------------------------------------------
    // Crear el método (servicio a consumir por un componente o todo el aplicativo)
    // de registro de Usuario
    createUser(newUser){
        //Guardar los parametros o datos que va a enviar el usuario y los vamos
        // a convertir en un json
        let params = JSON.stringify(newUser);
        console.log("params:"+params);
        
        // Indicar por las cabeceras HTTP el tipo de contenido del datos que se está enviando
        let options = {
            headers: new HttpHeaders( {'Content-type': 'application/json'} )
        };
        // El método debe devolver la conexión con la ruta de la api para ejecutar una funcion en especifico
        // localhost:4000/api/registro 
        // Debe ser igual al post, get, delete, etc. que se creó en el backEnd
        return this._http.post(
            this.url + "registro",
            params,
            options
        ).pipe(map(res => res));
    }

    userLogin(loguedUser){
        let params = JSON.stringify(loguedUser);
        let options = {
            headers: new HttpHeaders({'Content-Type':'application/json'})
        }
        return this._http.post(
            this.url + "login",
            params,
            options
        ).pipe(map(res => res));
    }

    getIdentify(){
        let autorizedUser = JSON.parse(sessionStorage.getItem('session'));
        // Validar si el localStorage está vacio
        if(autorizedUser != 'undefined'){
            this.person = autorizedUser;
        } else{
            this.person = null;
        }
        return this.person;
    }

    userUpdate(id, newUserData){
        let params = JSON.stringify(newUserData);
        let options = {
            headers: new HttpHeaders({'Content-Type':'application/json'})
        };
        return this._http.put(
            this.url + 'usuario/' + id,
            params,
            options
        ).pipe(map(res => res));
    }

    uploadUserImage(file: File, id){
        var formData = new FormData();
        formData.append('imageFile', file);
        return this._http.put(
            this.url + 'imagenUsuario/' + id,
            formData
        ).pipe(map(res => res));
    }

    getUsers(){
        let options = {
            headers: new HttpHeaders({'Content-Type':'application/json'})
        };
        return this._http.get(
            this.url + 'usuarios',
            options
        ).pipe(map(res => res));
    }

    getUser(id){
        let options = {
            headers: new HttpHeaders({'Content-Type':'application/json'})
        };
        return this._http.get(
            this.url + 'usuario/' +id,
            options
        ).pipe(map(res => res));
    }

    userDelete(id){
        let options = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };
        return this._http.delete(
            this.url + 'usuario/' + id,//ESTA ES LA RUTA EN EL BACK
            options
        ).pipe(map(res => res));
    }

    like(id,movieId){
        let options = {
            headers: new HttpHeaders({'Content-Type':'application/json'})
        };
        return this._http.put(
            this.url + 'like/' + id +'/'+ movieId,
            options
        ).pipe(map(res => res));
    }

    unlike(id,movieId){
        let options = {
            headers: new HttpHeaders({'Content-Type':'application/json'})
        };
        return this._http.put(
            this.url + 'unlike/' + id +'/'+ movieId,
            options
        ).pipe(map(res => res));
    }
}