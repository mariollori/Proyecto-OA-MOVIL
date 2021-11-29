import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { PacienteService } from 'src/app/services/paciente.service';
import { TokenService } from 'src/app/services/token.service';
import { ModificaratenpendComponent } from '../modificaratenpend/modificaratenpend.component';

@Component({
  selector: 'app-aten-pendientes',
  templateUrl: './aten-pendientes.component.html',
  styleUrls: ['./aten-pendientes.component.scss'],
})
export class AtenPendientesComponent implements OnInit {

  constructor(private pacserv: PacienteService,public alertCtrl: AlertController, private token:TokenService,public loadingController: LoadingController,public modalController: ModalController) { }
data:any=[];
loading:any;
 async presentLoading() {
    this.loading = await this.loadingController.create({
     
      message: 'Cargando...',
      
    });
    return  this.loading.present();
  }
  
  async showAlertsuccess(data) {  
      const alert = await this.alertCtrl.create({  
        header: 'Solicitud registrada',    
        message: `<img src = "assets/icon/success.png" style=" width=25px ;height=25px" > ${data}`,  
        buttons: ['OK']  
      });  
      return await alert.present();  
    }
  async modproximases(aten) {
    const modal = await this.modalController.create({
      component: ModificaratenpendComponent,
      swipeToClose: true,
      cssClass:'modprox',
       componentProps: { data:aten}
    });
     await modal.present();

     const { data } = await modal.onDidDismiss();
     
     switch (data['data']) {
       case 0:
         this.showAlertsuccess('Sesion modificada.');
         this.llamardata();
         break;
       default:
         break;
     }
  }
  ngOnInit() {
  this.llamardata();
   
   

  }

  llamardata(){
    this.presentLoading();
    this.pacserv.getatencion_pend(this.token.usuario.idpersonal).subscribe(
      (data)=>{
        console.log(data)
        this.data=  data
      this.loadingController.dismiss();}
    )
  }
  modmodal(aten){
    this.modproximases(aten);
  }
}
