import { Component, OnInit } from '@angular/core';
import { ActiveUserService } from './../../services/active-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private activeuserservice: ActiveUserService,
    private router: Router
  ) { }

  user = {
    nombres : '',
    apellidos : '',
    dpi : '',
    no_cuenta : '',
    saldo_inicial: 0,
    correo: '',
  }

  ngOnInit(): void {
    this.user.nombres = this.activeuserservice.getNameUserLogged();
    this.user.apellidos = this.activeuserservice.getApellidoUserLogged();
    this.user.saldo_inicial = this.activeuserservice.getSaldoUserLogged();
    this.user.no_cuenta = this.activeuserservice.getCuentaUserLogged();
    this.user.dpi = this.activeuserservice.getDpiUserLogged();
    this.user.correo = this.activeuserservice.getCorreoUserLogged();
  }

}
