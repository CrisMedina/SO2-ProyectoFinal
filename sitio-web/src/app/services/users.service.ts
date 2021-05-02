import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private http:HttpClient) { }

  //Obtiene todos los usuarios
  GetUsers(){
    return this.http.get(`${environment.URI}/users`);
  }

  //Obtiene un usuario por medio de el username y la clave
  GetUser(username: string, password: string){
    const url = `${environment.URI}/users/login/${username}&${password}`;
    return this.http.get(url);
  }

  //Obtiene un usuario por medio de el username 
  VerifyUser(cuenta: string){
    const url = `${environment.URI}/users/${cuenta}`;
    return this.http.get(url);
  }

  //Obtiene un usuario por medio de el username 
  GetIdUser(cuenta: string){
    const url = `${environment.URI}/users//getIdUser/${cuenta}`;
    return this.http.get(url);
  }

  //Crea un nuevo usuario
  CreateUser(user: any){
    console.log(user);
    return this.http.post(`${environment.URI}/users`, user);
  }

  //Actualiza los datos de un usuario
  EditUser(username: string, user: any){
    return this.http.put(`${environment.URI}/users/${username}`, user);
  }

  //Actualizar monto de usuario
  EditMonto(user: any){
    return this.http.put(`${environment.URI}/users`, user);
  }
  
}
