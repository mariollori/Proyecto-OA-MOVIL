import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController, NavParams } from '@ionic/angular';
import { Atencion } from 'src/app/models/atencion';
import { Paciente } from 'src/app/models/paciente';

import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-registro-atencion',
  templateUrl: './registro-atencion.component.html',
  styleUrls: ['./registro-atencion.component.scss'],
})
export class RegistroAtencionComponent implements OnInit {
  paciente= new Paciente();
  idpac;
  derivacion=false;
  atencion = new Atencion();
  datapaciente:FormGroup;
  fechaatencion:FormGroup;
  datosatencion:FormGroup;
  proximafecha;
  idasignacion :String;
  counter;
  idatencionactual;
  constructor(private loadingController:LoadingController,public navParams: NavParams, private mdoalctr : ModalController,private pacserv:PacienteService) { }
  loading:any;
  async presentLoading() {
     this.loading = await this.loadingController.create({
      
       message: 'GUARDANDO...',
       
     });
     return  this.loading.present();
   }
  ngOnInit() {
    this.datapaciente = new FormGroup({
      religion: new FormControl('', Validators.required),
      ciudad: new FormControl('', Validators.required),
      edad :new FormControl('', Validators.required),
      ocupacion :new FormControl(''),
      fecha_nacimiento: new FormControl('',  Validators.required),
      grado_educacion: new FormControl('')
      
    });
    this.fechaatencion = new FormGroup({
      fecha: new FormControl('', Validators.required),
    });

    this.datosatencion = new FormGroup({
      nro_sesion: new FormControl('', Validators.required),
      condicion: new FormControl('', Validators.required),
      evidencia :new FormControl('', Validators.required),
      observaciones :new FormControl('', Validators.required),
    });

    const key1= this.navParams.get('data');
    this.idasignacion = key1['idasignacion'];
    this.idpac = key1['idpaciente'];
     console.log(this.idasignacion)
     this.pacserv.getnroregistros(this.idasignacion).subscribe(
       data=>{
        if(data[0]['count']==0) {
          this.counter= Number(data[0]['count'])
        }else{
          this.counter= Number(data[0]['count'])
          this.pacserv.getidsesion(this.idasignacion).subscribe(
            data=>{
              console.log(data);
              this.idatencionactual= data[0]['idregistro_aten']
            }
          )

        }

        }
     )
  }

  registrar(){
    this.presentLoading();
    console.log(this.counter)
    switch (this.counter) {
      case 0:
        this.proximafecha= this.fechaatencion.controls['fecha'].value;
        this.paciente= this.datapaciente.value;
        this.paciente.idpaciente= this.idpac;
        this.atencion= this.datosatencion.value;
        this.pacserv.registrardata1(this.paciente,this.atencion, this.idasignacion, this.proximafecha).subscribe(data=>{
          console.log(data);
        this.loading.dismiss();
          this.mdoalctr.dismiss(
            {data:0}
          )
       });
      

        break;
      case 1:   
      this.proximafecha= this.fechaatencion.controls['fecha'].value;
      this.atencion= this.datosatencion.value;
      this.atencion.idregistro_aten=this.idatencionactual;
      this.pacserv.registrardata2(this.atencion, this.idasignacion, this.proximafecha).subscribe(data=>{
        console.log(data);
        this.loading.dismiss();
        this.mdoalctr.dismiss(
          {data:1}
        )
     });
    

        break;
      case 2: 
      this.atencion= this.datosatencion.value;
      this.atencion.idregistro_aten=this.idatencionactual;
      this.pacserv.registrardata3(this.atencion, this.idpac, this.derivacion).subscribe(
        data=>{ 
          console.log(data)
          this.loading.dismiss();
          this.mdoalctr.dismiss(
            {data:2}
          )
        });
        
        break;
      default:
        break;
    }
   

  }

  
  cerrar(){
    this.mdoalctr.dismiss(
      {data:4}
    );
  }

}
