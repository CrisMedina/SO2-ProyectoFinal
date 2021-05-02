import { Component, OnInit } from '@angular/core';
import { ActiveUserService } from './../../services/active-user.service';
import { UsersService } from './../../services/users.service';
import { TransferenciasService } from './../../services/transferencias.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.scss']
})
export class TransferenciaComponent implements OnInit {

  constructor(
    private activeuserservice: ActiveUserService,
    private userservice: UsersService,
    private transferenciaservice: TransferenciasService,
    private router: Router
  ) { }

  user = {
    id: '',
    nombres : '',
    apellidos : '',
    dpi : '',
    no_cuenta : '',
    saldo_inicial: 0,
    correo: '',
  }

  transferenciaData = {
    no_cuenta_envia : '',
    no_cuenta_recibe : '',
    id_usuario_envia: 0,
    id_usuario_recibe: 0,
    monto: 0,
  }

  newTrasferencia = {
    id_usuario_envia: 0,
    id_usuario_recibe: 0,
    monto: 0
  }

  editUser = {
    id: 0,
    monto: 0
  }

  alert = 'success';
  message = '';
  clave = '';

  ngOnInit(): void {
    this.user.no_cuenta = this.activeuserservice.getCuentaUserLogged();
    this.user.saldo_inicial = this.activeuserservice.getSaldoUserLogged();
    this.user.id = this.activeuserservice.getIdUserLogged();
  }

  transferencia(){
    if(this.transferenciaData.monto <= this.user.saldo_inicial){
      this.transferenciaData.id_usuario_envia = parseInt(this.user.id);
      //console.log(this.transferenciaData.id_usuario_envia);

      //Registrar una nueva transferencia
      if(this.transferenciaData.no_cuenta_recibe != ''){
        this.userservice.GetIdUser(this.transferenciaData.no_cuenta_recibe).subscribe((result: any) => {
          if(result.status === 200){
            this.transferenciaData.id_usuario_recibe = result.id;
            
            this.newTrasferencia.id_usuario_envia = this.transferenciaData.id_usuario_envia;
            this.newTrasferencia.id_usuario_recibe = this.transferenciaData.id_usuario_recibe;
            this.newTrasferencia.monto = this.transferenciaData.monto;
            
            this.transferenciaservice.CreateTransferencia(this.newTrasferencia).subscribe(
              (result) => {
                if (result){          
                      //Descontar el monto a la cuenta que envia
                      this.editUser.id = this.newTrasferencia.id_usuario_envia;
                      this.editUser.monto = this.newTrasferencia.monto * -1;
                      this.userservice.EditMonto(this.editUser).subscribe(
                        (result) => {
                          if (result){
                            //Sumar el monto a la cuenta que recibe
                            this.editUser.id = this.transferenciaData.id_usuario_recibe;
                            this.editUser.monto = this.editUser.monto * -1;
                            this.userservice.EditMonto(this.editUser).subscribe(
                              (result) => {
                                if (result){
                                  //Actualizar el saldo
                                  this.alert = 'success';
                                  this.message = 'Transferencia creada con éxito.';
                                }else{
                                  this.alert = 'danger'
                                  this.message = 'No fue posible crear la transferencia.'
                                }
                              })
                          }else{
                            this.alert = 'danger'
                            this.message = 'No fue posible crear la transferencia.'
                          }
                        })
                    
                      this.newTrasferencia = {
                        id_usuario_envia: 0,
                        id_usuario_recibe: 0,
                        monto: 0
                      }
                      this.transferenciaData.no_cuenta_recibe = '';
                      this.transferenciaData.monto = 0;
                }else{
                  this.alert = 'danger'
                  this.message = 'No fue posible crear la transferencia.'
                }
              })
          }else{
            this.alert = 'danger';
            this.message = 'No Cuenta Destino Incorrecta.';
          }
        });
      }else{
        this.alert = 'danger';
        this.message = 'No Cuenta Destino Incorrecta.';
      }
    }else{
      this.alert = 'danger';
      this.message = 'Monto incorrecto, debe ser menor al saldo actual.';
    }
  }
}
