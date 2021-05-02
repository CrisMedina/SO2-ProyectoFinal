import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  //URI =  'http://13.59.69.209:3000'
  URI = 'http://127.0.0.1:3000'
  //URI = 'http://loadbalancing-g5-1917417838.us-east-2.elb.amazonaws.com:3000'

  constructor(private http:HttpClient) { }

  //Obtiene los albumes que pertenecen al user loggeado
  GetIdAlbum(username: any){
    const url = `${environment.URI}/albums/perfil/${username}`;
    return this.http.get(url);
  }

  //Obtiene los albumes que pertenecen al user loggeado
  GetAlbum(username: any){
    return this.http.get( `${environment.URI}/albums/${username}`);
  }

  //Crea un nuevo usuario
  CreateAlbum(album: any){
    return this.http.post(`${environment.URI}/albums`, album);
  }

  //Elimina el album con el id y usuario especificado
  DeleteAlbum(id: string){
    return this.http.delete(`${environment.URI}/albums/${id}`);
  }

  GetPhotos(id_album: string){
    return this.http.get(`${environment.URI}/photos/${id_album}`);
  }

}
