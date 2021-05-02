import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http:HttpClient) { }

  uploadFile(archivos, nombre, album){
    console.log("llego al uploadfile")
    return this.http.post(`${environment.URI}/photos/${nombre}&${album}`, archivos);
  }

  subirFoto(photo: any){
    return this.http.post(`${environment.URI}/photos/subirfoto`, photo);
  }

  guardarFotoBD(photo: any){
    return this.http.post(`${environment.URI}/photos/guardarfoto`, photo);
  }

  publicarFoto(photo: any){
    return this.http.post(`${environment.URI}/photos/publicarFoto`, photo);
  }

  actualizarFotoPerfil(photo: any){
    return this.http.post(`${environment.URI}/photos/actualizar`, photo);
  }

}


