import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/services/paciente.service';
import { TokenService } from 'src/app/services/token.service';
import OneSignal from 'onesignal-cordova-plugin';
import { LoadingController, NavController } from '@ionic/angular';
import { ImgService } from 'src/app/services/img.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

declare var window:any;
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
 
  nombrecompleto;
  telefono;
  tipo;
  correo;
  archivo;
  idpersona;
  imgCodified;
  constructor(private loadingController:LoadingController,private service: PacienteService, private token: TokenService, private navctrl: NavController,private camera:Camera,private imgserv:ImgService) { }
  loading:any;
  async presentLoading(message) {
     this.loading = await this.loadingController.create({
      
       message: message,
       
     });
     return  this.loading.present();
   }
  ngOnInit() {
    
    this.OneSignalInit();
 
    
    console.log(this.token.usuario.idpersonal)
    this.service.getuser(this.token.usuario.idpersonal).subscribe(
      data => {
        console.log(data)
        this.idpersona = data[0].idpersona;
        this.correo = data[0].correo;
        this.tipo = data[0].tipo;
        this.nombrecompleto = data[0].nombre;
        this.telefono = data[0].telefono;
        if(data[0].foto==null){
          var doc = document.getElementById('imagendeperfil');
          this.imgserv.nombre='https://s3.amazonaws.com/files.patmos.upeu.edu.pe/img/upload/fotos/80/no_photo.jpg'
          localStorage.setItem('imagen','https://s3.amazonaws.com/files.patmos.upeu.edu.pe/img/upload/fotos/80/no_photo.jpg')
          doc.setAttribute('src','https://s3.amazonaws.com/files.patmos.upeu.edu.pe/img/upload/fotos/80/no_photo.jpg');
        }else{
          var doc = document.getElementById('imagendeperfil')
          this.presentLoading('Cargando...')
          this.imgserv.mostrarimagenfirebase(data[0].foto).subscribe(
            data2=>{
              localStorage.setItem('imagen',data2);
              this.imgserv.nombre =data2;
              this.loading.dismiss();
              doc.setAttribute('src',data2);
            }
          )
         
        }

      }
    )
  }
 mostrarimagen(){
  this.presentLoading('Cargando...')
  this.service.getuser(this.token.usuario.idpersonal).subscribe(
    data => {
      console.log(data)
      if(data[0].foto==null){
        this.loading.dismiss();
        var doc = document.getElementById('imagendeperfil')
        doc.setAttribute('src','https://s3.amazonaws.com/files.patmos.upeu.edu.pe/img/upload/fotos/80/no_photo.jpg');
        localStorage.setItem('imagen','https://s3.amazonaws.com/files.patmos.upeu.edu.pe/img/upload/fotos/80/no_photo.jpg');
        this.imgserv.nombre='https://s3.amazonaws.com/files.patmos.upeu.edu.pe/img/upload/fotos/80/no_photo.jpg'
      
      }else{
        var doc = document.getElementById('imagendeperfil')
        this.loading.dismiss();
          this.imgserv.mostrarimagenfirebase(data[0].foto).subscribe(
            data2=>{
              this.imgserv.nombre =data2;
              localStorage.setItem('imagen',data2)
              doc.setAttribute('src',data2);
            }
          )
      }

    }
  )
 }
  msotrargaleria(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
    }
    this.camera.getPicture(options).then((imageData) => {
      const img= window.Ionic.WebView.convertFileSrc(imageData);
      console.log(imageData)
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      
       
     }, (err) => {
      // Handle error
     });
  }


  OneSignalInit() {
    // Uncomment to set OneSignal device logging to VERBOSE  
    // OneSignal.setLogLevel(6, 0);
    OneSignal.setExternalUserId(this.token.usuario.idpersonal.toString(),'asdsadsad', (results) => {
      // The results will contain push and email success statuses
      console.log('Results of setting external user id');
      console.log(results);});
    // NOTE: Update the setAppId value below with your OneSignal AppId.
    OneSignal.setAppId("0f4599ff-8cbe-4d06-a525-f637d5c40dc0");


   
    
    console.log(this.token.usuario.idpersonal.toString())
 
    OneSignal.setNotificationOpenedHandler((jsonData) => {
      this.navctrl.navigateForward('nav/tabs/listapac');
    });

    // iOS - Prompts the user for notification permissions.
    //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 6) to better communicate to your users what notifications they will get.
    OneSignal.promptForPushNotificationsWithUserResponse((accepted) => {
      console.log("User accepted notifications: " + accepted);
    });
  }

  mostrar(event) {
    this.archivo = event.target.files[0];
    var supportedImages = ["image/jpeg", "image/png", "image/gif"];
    var seEncontraronElementoNoValidos = false;

    if (supportedImages.indexOf(this.archivo.type) != -1) {
      this.imgCodified = URL.createObjectURL(this.archivo);
      var doc = document.getElementById('imagendeperfil')
      doc.setAttribute('src',this.imgCodified);
      this.presentLoading('GUARDANDO...')
      this.imgserv.subirfoto(this.token.usuario.idpersonal,this.archivo.name).subscribe(
        data=>{
          this.imgserv.subirImagen(this.archivo).then(
            url=>{
              this.loading.dismiss();
              this.mostrarimagen();
              this.archivo=null;
            }
          );
        }
      )
    }
    else {
      seEncontraronElementoNoValidos = true;
    }
  };

 
}
