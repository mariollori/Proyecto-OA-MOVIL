import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Persona } from 'src/app/models/persona';

import { PacienteService } from 'src/app/services/paciente.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-homepac',
  templateUrl: './homepac.page.html',
  styleUrls: ['./homepac.page.scss'],
})
export class HomepacPage implements OnInit {

  constructor(private service:PacienteService,private token:TokenService,private navctr:NavController) { }
  value;
  datapsi=[];
  persona:Persona=new Persona();
  ngOnInit() {
    this.value='info'
  this.service.getdataperson(this.token.persona.idpersona).subscribe(
    data=>{
           this.persona=data;
           console.log(this.persona)
 
    }

  )
    this.service.getdatasignacion(this.token.persona.idpaciente).subscribe(
      data=>{
        console.log(data);
        this.datapsi=data;
      }
    )
    
  }
 
segmentChanged(event){
  
  this.value = event.detail.value;
  console.log(this.value)
}

logout(){
  this.token.logout()
  this.persona=new Persona();
  this.navctr.navigateRoot('login');
}
}
