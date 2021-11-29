import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario';
import { RegistropacComponent } from 'src/app/registerpac/registropac/registropac.component';
import { AuthService } from 'src/app/services/auth.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  value;
  nro_cita;
  dni;
  loading:any;
  @ViewChild('passwordEyeRegister') passwordEye;
  passwordTypeInput  =  'password';
  usuario = new Usuario();
  iconpassword  =  'eye-off';
  constructor(private token:TokenService,private pacserv:PacienteService,public modalController: ModalController,private navCtrl: NavController,private auth:AuthService,public loadingController: LoadingController,private toastController: ToastController) {}
  ngOnInit(): void {
    this.value='psi';
  }

  togglePasswordMode() {
    this.passwordTypeInput  =  this.passwordTypeInput  ===  'text'  ?  'password'  :  'text';
    this.iconpassword  =  this.iconpassword  ===  'eye-off'  ?  'eye'  :  'eye-off';
    this.passwordEye.el.setFocus();
}

async presentLoading() {
  this.loading = await this.loadingController.create({
   
    message: 'Validando...',
    
  });
  return  this.loading.present();
}

async presentToast(message) {
  const toast = await this.toastController.create({
    message,
    duration: 2000
  });
  toast.present();
}

segmentChanged(event){
  this.value = event.detail.value;
}


login(): void {
  console.log(this.usuario);
  if (this.usuario.username == null || this.usuario.password == null) {
   
     this.presentToast('Falto rellenar los campos');
  }else{
    
    this.presentLoading();
    this.auth.login(this.usuario).subscribe(
      response => {
        this.loading.dismiss();

        this.token.guardartoken(response.token);
        this.token.guardarusuario(response.token)
        
        this.navCtrl.navigateRoot('nav/perfil/datapersonal')
        
       
      }, err => {
        this.loading.dismiss();
        this.presentToast('Credenciales no validas');
        console.log(err)
      }
    )
  }
  


}
async presentModal() {
  const modal = await this.modalController.create({
    component: RegistropacComponent,
    swipeToClose: true,
  });
  return await modal.present();
}
registrarpac(){
  this.presentModal();

}




loginpac(){
  this.presentLoading();
  this.pacserv.loginpac(this.nro_cita,this.dni).subscribe(
    (data)=>{
      
         this.loading.dismiss();
         
            this.token.guardarpersona(data);
            this.navCtrl.navigateRoot('homepac');
      
    },(error)=>{
      this.loading.dismiss();
      this.presentToast('Paciente no existente.  ');
    }
  )
}

}
