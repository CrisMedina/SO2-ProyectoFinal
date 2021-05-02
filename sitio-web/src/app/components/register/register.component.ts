import { UsersService } from './../../services/users.service';
import { AlbumsService } from './../../services/albums.service';
import { PhotosService } from './../../services/photos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  codigo = ''

  user = {
    nombres : '',
    apellidos : '',
    dpi : '',
    no_cuenta : '',
    saldo_inicial: '',
    correo: '',
    clave: '',
    confirm: ''
  }

  alert = 'success'
  message = ''

  constructor(
    private userservice: UsersService,
    private photosservice: PhotosService,
    private albumsservice: AlbumsService  
  ) { }

  ngOnInit(): void {
  }

  createUser() {
    const {nombres, apellidos, dpi, no_cuenta, correo, saldo_inicial, clave, confirm} = this.user
    
    if (nombres && apellidos && dpi && no_cuenta && correo && clave && saldo_inicial){
      if (clave === confirm){
        console.log(no_cuenta)
        this.userservice.VerifyUser(no_cuenta).subscribe(
          (verify) => {
            console.log(verify)
            if (verify){
              this.userservice.CreateUser(this.user).subscribe(
                (result) => {
                  if (result){
                        this.alert = 'success';
                        this.message = 'Usuario creado exitosamente con código: ' + result;
                        this.user = {
                          nombres : '',
                          apellidos : '',
                          dpi : '',
                          no_cuenta : '',
                          saldo_inicial: '',
                          correo: '',
                          clave: '',
                          confirm: ''
                        }
                  }else{
                    this.alert = 'danger'
                    this.message = 'No fue posible crear el usuario.'
                  }
                }
              )         
            }else{
              this.alert = 'danger'
              this.message = 'El número de cuenta ya se encuentra registrado.'
            }
          }
        )
      }else{
        this.alert = 'danger'
        this.message = 'Las constraseñas no coinciden.'
      }
    }else{
      this.alert = 'danger'
      this.message = 'Campos requeridos.'
    }
    
  }


}
