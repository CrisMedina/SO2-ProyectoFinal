import { Component, OnInit } from '@angular/core';
import { ActiveUserService } from '../app/services/active-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'sitio-web';
  username = ''
  constructor(
    private activeuserservice: ActiveUserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    setInterval(() => {
      this.username = this.activeuserservice.getNombreCompleto();
    }, 1000);
  }

  

  logout(){
    this.activeuserservice.deleteUserLogged()
    this.username = this.activeuserservice.getNombreCompleto();
    this.router.navigate(['']);
  }
}
