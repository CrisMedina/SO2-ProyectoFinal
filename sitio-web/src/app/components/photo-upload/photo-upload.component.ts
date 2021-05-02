import { ActiveUserService } from './../../services/active-user.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PhotosService } from './../../services/photos.service';
import { AlbumsService } from './../../services/albums.service';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.scss'],
})
export class PhotoUploadComponent implements OnInit {
  @ViewChild('labelito', { static: true }) etiqueta: ElementRef;
  uploadedFiles: Array<File>;

  idFoto = 'Fotos_Publicadas/image';
  url: any;

  alert = 'success';
  message = '';

  foto = {
    url: '',
    nombre: '',
    album: '',
    //perfil: 0,
    descripcion: '',
  };

  constructor(
    private albumsservice: AlbumsService,
    private activeuserservice: ActiveUserService,
    private photosservice: PhotosService,
  ) {}

  ngOnInit(): void {
    this.foto.url = '../../../assets/user.svg';
    this.url = this.foto.url;
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.etiqueta.nativeElement.value = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.url = event.target.result;
        //console.log(this.url)
        this.foto.url = this.url;
      };
    }
  }

  subirFoto() {
    const { url, nombre, album, descripcion } = this.foto;
    if (nombre && descripcion) {
      this.idFoto = this.idFoto + new Date().getTime() + '.jpg';
      //AQUI sube la foto al bucket
      this.photosservice.subirFoto({ id: this.idFoto, foto: this.url }).subscribe();

      //Ahora analiza las etiquetas
      


      /*this.userservice.VerifyUser(username).subscribe((verify) => {
        if (verify) {
          this.userservice.CreateUser(this.user).subscribe((result) => {
            if (result) {
              this.albumsservice.GetIdAlbum(username).subscribe((resultado) => {
                
                
                this.photosservice
                  .guardarFotoPublicadaBD({
                    url: this.urlbucket + this.idFoto,
                    nombre: this.foto.nombre,
                    album: resultado[0].id,
                    perfil: 1,
                    descripcion: this.foto.descripcion
                  })
                  .subscribe();
                console.log(resultado[0].id);
                this.alert = 'success';
                this.message = 'Usuario creado exitosamente.';
                this.user = {
                  username: '',
                  nombre: '',
                  clave: '',
                  confirm: '',
                  image: '',
                };
                this.user.image = '../../../assets/user.svg';
                this.url = this.user.image;
              });
            } else {
              this.alert = 'danger';
              this.message = 'No fue posible crear el usuario.';
            }
          });
        } else {
          this.alert = 'danger';
          this.message = 'El usuario ya existe.';
        }
      });*/
    } else {
      this.alert = 'danger';
      this.message = 'Campos requeridos.';
    }
  }
}
