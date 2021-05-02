import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsersService } from './../../services/users.service';
import { ActiveUserService } from './../../services/active-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  user = {
    no_cuenta: '',
    clave: '',
  };

  alert = 'success';
  message = '';


  constructor(
    private userservice: UsersService,
    private activeuserservice: ActiveUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  login() {
    const { no_cuenta, clave } = this.user;

    if (no_cuenta && clave) {
      this.userservice.GetUser(no_cuenta, clave).subscribe((result) => {
        console.log(result)
        if (result) {
          console.log(result[0]);
          this.activeuserservice.setActiveUser(result[0]);
          this.router.navigate(['home']);
          this.user = {
            no_cuenta: '',
            clave: '',
          };
        } else {
          this.alert = 'danger';
          this.message = 'Credenciales incorrectas.';
        }
      });
    } else {
      this.alert = 'danger';
      this.message = 'Campos requeridos.';
    }
  }

}
