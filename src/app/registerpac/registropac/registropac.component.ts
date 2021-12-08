import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';

import { Paciente } from 'src/app/models/paciente';
import { Persona } from 'src/app/models/persona';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-registropac',
  templateUrl: './registropac.component.html',
  styleUrls: ['./registropac.component.scss'],
})
export class RegistropacComponent implements OnInit {
  registerpersonaldata:FormGroup;
  registerpacdata:FormGroup;
  persona:Persona;
  paciente:Paciente;
  constructor(public alertCtrl: AlertController,public modalController: ModalController,private pacserv:PacienteService,public loadingController: LoadingController) { }
  loading:any;
  ngOnInit() {
    this.registerpersonaldata = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required,Validators.email]),
      genero: new FormControl('',  Validators.required),
      telefono: new FormControl('', Validators.required),
      dni:new FormControl('', Validators.required),
      
    });
    this.registerpacdata = new FormGroup({
      motivo: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      
      
      
    });
  }
  cerrar(){
    this.modalController.dismiss();
  }

 
  
  async presentLoading() {
    this.loading = await this.loadingController.create({
     
      message: 'GUARDANDO...',
      
    });
    return  this.loading.present();
  }
  

  crearpaciente(){
    this.presentLoading();
    this.paciente=this.registerpacdata.value;
    this.persona=this.registerpersonaldata.value;
    this.pacserv.crearpaciente(this.persona,this.paciente).subscribe(
      (data)=>{
        this.loading.dismiss();
        this.showAlert(data);
        this.limpiar();
        
        console.log(data);
       
      }, err => {
        this.loading.dismiss();
        console.log(err);
      }
    )

  }
  async showAlert(message) {  
    const alert = await this.alertCtrl.create({  
      header: 'Atencion registrada',    
      message,  
      buttons: ['OK']  
    });  
    return await alert.present();  
  }
  limpiar(){
    this.registerpacdata.reset();
    this.registerpersonaldata.reset();
  }
}
