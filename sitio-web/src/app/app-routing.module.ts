import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PhotoUploadComponent } from './components/photo-upload/photo-upload.component';
import { RegisterComponent } from './components/register/register.component';
import {ConsultaComponent} from './components/consulta/consulta.component';
import {TransferenciaComponent} from './components/transferencia/transferencia.component';
import { ReporteComponent } from './components/reporte/reporte.component';

const routes: Routes = [
  { path: '', component:  LoginComponent},
  { path: 'home', component:  HomeComponent},
  { path: 'photo-upload', component:  PhotoUploadComponent},
  { path: 'register', component:  RegisterComponent},
  { path: 'consulta', component:  ConsultaComponent},
  {path: 'transferencia', component: TransferenciaComponent},
  {path: 'reporte', component: ReporteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
