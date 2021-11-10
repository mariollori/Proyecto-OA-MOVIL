import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { PacienteService } from 'src/app/services/paciente.service';
import { TokenService } from 'src/app/services/token.service';
import { DetallePacComponent } from '../../detailpaciente/detalle-pac/detalle-pac.component';
import { MenupopoverComponent } from '../../menu/menupopover/menupopover.component';
import { RegistroAtencionComponent } from '../../registro_atencion/registro-atencion/registro-atencion.component';

@Component({
  selector: 'app-listapac',
  templateUrl: './listapac.component.html',
  styleUrls: ['./listapac.component.scss'],
})
export class ListapacComponent implements OnInit {

  constructor(public modalController: ModalController,public alertCtrl: AlertController,private token:TokenService, private pac:PacienteService,public popoverController: PopoverController) { }
  
  
  datalist:any = [];
  ngOnInit() {
    
   this.llamarpacientes();



  } 
  llamarpacientes(){
    this.pac.getlistpac(this.token.usuario.idpersonal).subscribe(
      data=>{this.datalist=data; console.log(data)}
    )
  }
  async modeldetail(pac) {
    const modal = await this.modalController.create({
      component: DetallePacComponent,
      swipeToClose: true,
      cssClass:'detailmodal',
       componentProps: { data:pac}
    });
    return await modal.present();
  }
  async showAlertsuccess(data) {  
    const alert = await this.alertCtrl.create({  
      header: 'Solicitud registrada',    
      message: `<img src = "assets/icon/success.png" style=" width=25px ;height=25px" > ${data}`,  
      buttons: ['OK']  
    });  
    return await alert.present();  
  }
  async registermodal(pac) {
    const modal = await this.modalController.create({
      component: RegistroAtencionComponent,
      swipeToClose: true,
      
       componentProps: { data:pac}
    });
     await modal.present();
     const { data } = await modal.onDidDismiss();
     
     switch (data['data']) {
       case 0:
       
         this.showAlertsuccess('Atencion registrada Correctamente');
         
         break;
       case 1:
      this.showAlertsuccess('Atencion registrada correctamente.');
         
         break;
       case 2: 
     
       this.showAlertsuccess('Ultima atencion registrada correctamente.');
          this.llamarpacientes();  
          break;
       default:
         break;
     }
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: MenupopoverComponent,
      cssClass: 'contact-popover',
      event: ev,
      translucent: true,
      backdropDismiss:false,
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
    return data.opcion;
  }



  
  async opciones(ev, pac:any){
    let opc =await this.presentPopover(ev);
    
        switch (opc) {
          case 1:this.registermodal(pac);
          
            
            break;

          case 2:
            
            break;

          case 3:this.modeldetail(pac);
            
            break;
        
          default:
            break;
        }

  }

}
