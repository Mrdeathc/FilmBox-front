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

// Dentro de Angular existe un elemento llamado Overvable, recoge las respuestas que se envian a un servidor

import { Observable } from 'rxjs';

@Injectable()
export class EpisodeService {
    // Crear cada uno de los servicios que van a interactuar entre el front y el back
    // Crear una variable que guarde la ruta URL de la api con la que nos queremos conectar

    url = "http://localhost:4000/api/";
    // Crearemos uanvaraible publica que nos permita reconocer al usuario 
    // para un local Storage

    /* 

        Vamos a crear un constructor que nos permitira inicializar los metodos POST, PU, GET, DELETE.
        Asu vez crearemos una variable privada que guardara el objeto HttpClient esto para poder tener acceso a los metodos que ya conocemos

    */

    constructor(
        private _http: HttpClient
    ){}

    // Vamos a crear el metodo (Servcio a consumir por un componenete o todo el aplicativo) de registro de usuario 

    episodeCreate(newEpisode){
        // Guardar los parametros que va a enviar el usaurio.
        // Convertirlos en un JSON
        let params =JSON.stringify(newEpisode);
        // Indicar por las cabeceras HTTP el tipo de contenido del dato
        // que se esta enviando
        let options = {
            headers: new HttpHeaders( {'Content-Type': 'application/json'})
        };
        // El metodo debe devolver la concexion de la ruta de la api
        // para ejecutar una function en especifico
        // POST=>localhost:4000/api/episode
        return this._http.post(
            this.url + "episodio",
            params,
            options
        ).pipe(map(res => res));
    }

    episodeUpdate(id, updatedEpisode){
        let params = JSON.stringify(updatedEpisode);
        let options = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };
        return this._http.put(
            this.url + 'episodio/' + id,//ESTA ES LA RUTA EN EL BACK
            params,
            options
        ).pipe(map(res => res));
    }

    episode(id:String){
        let options = {
            headers: new HttpHeaders( {'Content-Type': 'application/json'} )
        };
        return this._http.get(
            this.url + "episodio/" + id,
            options
        ).pipe(map(res => res));
    }

    episodes(){
        let options = {
            headers: new HttpHeaders( {'Content-Type': 'application/json'} )
        };
        return this._http.get(
            this.url + "episodio/",
            options
        ).pipe(map(res => res));
    }

    uploadEpisodeImage(file: File, id){
        var formData = new FormData();
        formData.append('imageFile', file);
        console.log(formData)
        return this._http.put(
            this.url + 'imagenEpisodio/' + id,
            formData
        ).pipe(map(res => res))
    }
    uploadEpisodeVideo(file: File, id){
        var formData = new FormData();
        formData.append('videoFile', file);
        console.log(formData)
        return this._http.put(
            this.url + 'videoEpisodio/' + id,
            formData
        ).pipe(map(res => res))
    }

    episodeDelete(id){
        let options = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };
        return this._http.delete(
            this.url + 'episodio/' + id,//ESTA ES LA RUTA EN EL BACK
            options
        ).pipe(map(res => res));
    }
}