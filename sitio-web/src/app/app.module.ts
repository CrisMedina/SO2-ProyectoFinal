import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import Amplify, {Interactions } from 'aws-amplify';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PhotoUploadComponent } from './components/photo-upload/photo-upload.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { TransferenciaComponent } from './components/transferencia/transferencia.component';
import { ReporteComponent } from './components/reporte/reporte.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PhotoUploadComponent,
    ConsultaComponent,
    TransferenciaComponent,
    ReporteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
