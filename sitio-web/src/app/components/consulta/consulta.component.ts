import { Component, OnInit } from '@angular/core';
import { ActiveUserService } from './../../services/active-user.service';
import { UsersService } from './../../services/users.service';
import { TransferenciasService } from './../../services/transferencias.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {

  constructor(
    private activeuserservice: ActiveUserService,
    private userservice: UsersService,
    private transferenciaservice: TransferenciasService,
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

  alert = 'success';
  message = '';

  ngOnInit(): void {
    //this.user.saldo_inicial = this.activeuserservice.getSaldoUserLogged();
    this.user.no_cuenta = this.activeuserservice.getCuentaUserLogged();
    this.consultarSaldo();
  }

  consultarSaldo(){
    this.userservice.GetIdUser(this.user.no_cuenta).subscribe((result: any) => {
      if(result.status === 200){
        this.user.saldo_inicial = result.saldo;
      }else{
        this.alert = 'danger';
        this.message = 'Error al consultar el saldo.';
      }
    });
  }
}

