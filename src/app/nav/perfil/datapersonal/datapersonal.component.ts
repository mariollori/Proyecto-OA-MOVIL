import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { LoadingController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'src/app/models/persona';
@Component({
  selector: 'app-datapersonal',
  templateUrl: './datapersonal.component.html',
  styleUrls: ['./datapersonal.component.scss'],
})
export class DatapersonalComponent implements OnInit {
  editstate=false;
  constructor(private service:PacienteService,private token:TokenService,public loadingController: LoadingController) { }
 correo;
 nombre;
 telefono;
 apellido;
 genero;
 idpersona;
 persona:Persona=new Persona();
 loading:any;
 async presentLoading(message) {
    this.loading = await this.loadingController.create({
     
      message: message,
      
    });
    return  this.loading.present();
  }
  ngOnInit() {
  
 this.llamardata();
  }
  llamardata(){
    this.presentLoading('Cargando...');
    this.service.getuser(this.token.usuario.idpersonal).subscribe(
      data=>{
    console.log(data)
    this.idpersona=data[0].idpersona;
       this.correo= data[0].correo;
       this.apellido= data[0].apellido;
         this.nombre= data[0].nombre ;
         this.telefono=data[0].telefono;
         this.genero=data[0].genero;
         this.loading.dismiss();
      }
    )
  }

  activar(){
    this.editstate=true;
    console.log(this.editstate)
  }
  desactive(){
    this.editstate=false;
    this.persona=new Persona();
    this.llamardata();

  }
  save(){
   
    console.log(this.apellido)
    this.persona.apellido = this.apellido;
    this.persona.correo=this.correo;
    this.persona.genero=this.genero;
    this.persona.telefono=this.telefono;
    this.persona.idpersona= this.idpersona;
    this.persona.nombre=this.nombre;
    this.presentLoading('Guardando');
    this.service.changedataper(this.persona).subscribe(
      data=>{
        this.loading.dismiss();
        this.persona=new Persona();
        this.llamardata();
        this.editstate=false;
      }
    )
  }
}
