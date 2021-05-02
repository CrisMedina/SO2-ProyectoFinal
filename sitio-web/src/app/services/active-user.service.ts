import { Injectable } from '@angular/core';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ActiveUserService {

  public activeUser;
  constructor() { this.activeUser = false; }

  setActiveUser(user: any){
    this.activeUser = true;
    localStorage.setItem('ActiveUser',JSON.stringify(user));
  }

  getUserLogged(){
    return JSON.parse(localStorage.getItem('ActiveUser'));
  }

  deleteUserLogged(){
    this.activeUser = false;
    localStorage.removeItem('ActiveUser');
  }

  getNombreCompleto(){
    try{
      return JSON.parse(localStorage.getItem('ActiveUser')).nombres+" " +JSON.parse(localStorage.getItem('ActiveUser')).apellidos;
    }catch(err){
      //console.log('error');
      return '';
    }
  }

  getApellidoUserLogged(){
    try{
      return JSON.parse(localStorage.getItem('ActiveUser')).apellidos;
    }catch(err){
      //console.log('error');
      return '';
    }
  }

  getNameUserLogged(){
    try{
      return JSON.parse(localStorage.getItem('ActiveUser')).nombres;
    }catch(err){
      //console.log('error');
      return '';
    }
  }

  getSaldoUserLogged(){
    try{
      return JSON.parse(localStorage.getItem('ActiveUser')).saldo_inicial;
    }catch(err){
      console.log('error');
      return '';
    }
  }

  getDpiUserLogged(){
    try{
      return JSON.parse(localStorage.getItem('ActiveUser')).dpi;
    }catch(err){
      console.log('error');
      return '';
    }
  }

  getCorreoUserLogged(){
    try{
      return JSON.parse(localStorage.getItem('ActiveUser')).correo;
    }catch(err){
      console.log('error');
      return '';
    }
  }

  getCuentaUserLogged(){
    try{
      return JSON.parse(localStorage.getItem('ActiveUser')).no_cuenta;
    }catch(err){
      console.log('error');
      return '';
    }
  }

  getClaveUserLogged(){
    try{
      return JSON.parse(localStorage.getItem('ActiveUser')).clave;
    }catch(err){
      console.log('error');
      return '';
    }
  }

  getIdUserLogged(){
    try{
      return JSON.parse(localStorage.getItem('ActiveUser')).id;
    }catch(err){
      console.log('error');
      return '';
    }
  }

  isLogged(){
    if(this.getUserLogged()!=-1)
      return true;
    else 
      return false;
  }


}
