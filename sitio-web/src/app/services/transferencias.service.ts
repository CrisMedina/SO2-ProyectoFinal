import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferenciasService {

  constructor(private http:HttpClient) { }

  //Obtiene todas las transferencias
  GetTransferencias(){
    return this.http.get(`${environment.URI}/transferencias`);
  }

  //Crea una nueva transferencia
  CreateTransferencia(transferencia: any){
    console.log(transferencia);
    return this.http.post(`${environment.URI}/transferencias`, transferencia);
  }

  //Obtiene el id de un usuario por medio de su cuenta
  VerifyUser(cuenta: string){
    const url = `${environment.URI}/tansferencias/${cuenta}`;
    return this.http.get(url);
  }

}
