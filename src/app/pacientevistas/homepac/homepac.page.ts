import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Persona } from 'src/app/models/persona';
import { ImgService } from 'src/app/services/img.service';

import { PacienteService } from 'src/app/services/paciente.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-homepac',
  templateUrl: './homepac.page.html',
  styleUrls: ['./homepac.page.scss'],
})
export class HomepacPage implements OnInit {

  constructor(private service: PacienteService,private imgserv:ImgService, private token: TokenService, private navctr: NavController, public loadingController: LoadingController) { }
  value;
  loading;
  puntajeactual=0;
  valortotal;
  datapsi = [];
  puntuacion = [
    { valor: 1, icon: 'star-outline' },
    { valor: 2, icon: 'star-outline' },
    { valor: 3, icon: 'star-outline' },
    { valor: 4, icon: 'star-outline' },
    { valor: 5, icon: 'star-outline' }
  ]
  persona: Persona = new Persona();
  ngOnInit() {
    this.value = 'info'
    this.presentLoading()
    this.service.getdataperson(this.token.persona.idpersona).subscribe(
      data => {
        this.persona = data;
        


      }

    )
    this.service.getdatasignacion(this.token.persona.idpaciente).subscribe(
      data => {
       
        this.datapsi = data;
        console.log(data)
        if(this.datapsi){
          if(data.foto === null){
            this.loading.dismiss();
            var doc = document.getElementById('psilogo');
            doc.setAttribute('src','https://s3.amazonaws.com/files.patmos.upeu.edu.pe/img/upload/fotos/80/no_photo.jpg');
          }else{
            this.loading.dismiss();
            this.imgserv.mostrarimagenfirebase(data.foto).subscribe(
              data2=>{
               
                var doc = document.getElementById('psilogo');
                doc.setAttribute('src',data2);
              }
            )
  
  
          }
        }else{
          this.loading.dismiss();
        }
        
        
      }
    )
    this.service.getpuntajeexist(this.token.persona.idpaciente).subscribe(
      data=>{
        console.log(data)
        if(data.length>0){
          this.puntajeactual=data[0].puntaje;
          console.log(this.puntajeactual)
        }else{
          this.puntajeactual=0
        }
      }
    )



  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'dataloader',
      message: 'Cargando...',
      showBackdrop:true

    });
    return this.loading.present();
  }

  segmentChanged(event) {

    this.value = event.detail.value;
    console.log(this.value)
  }

  logout() {
    this.token.logout()
    this.persona = new Persona();
    this.navctr.navigateRoot('login');
  }

  asignar(valoractual) {
    this.valortotal=valoractual;
    for (let index = 0; index < this.puntuacion.length; index++) {
      if (this.puntuacion[index].valor <= valoractual) {
        this.puntuacion[index].icon = 'star'
      } else {
        this.puntuacion[index].icon = 'star-outline'
      }

    }

  }

  registrarvaloracion(){
    this.service.crearvaloracion(this.token.persona.idpaciente,this.datapsi['idpersonal'],this.valortotal).subscribe(
      data=>{
        this.puntajeactual=this.valortotal;
      }
    )

  }
}
