import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Cancelacion } from 'src/app/models/cancelacion';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-cancelaraten',
  templateUrl: './cancelaraten.component.html',
  styleUrls: ['./cancelaraten.component.scss'],
})
export class CancelaratenComponent implements OnInit {
  idasignacion;
  motivo='';
  paciente;
  idpac;
  constructor(public navParams: NavParams, private mdoalctr: ModalController,private serv:PacienteService) { }

  ngOnInit() {
    const key1 = this.navParams.get('data');
    this.paciente = key1['nombre'];
    this.idasignacion = key1['idasignacion'];
    this.idpac = key1['idpaciente']
    console.log(this.idpac,this.idasignacion,this.paciente)
    
  }
  cancelaratencion(){
    const cancelacion= new Cancelacion();
    cancelacion.idasignacion=this.idasignacion;
    cancelacion.motivo=this.motivo;
    this.serv.crearcancelacion(cancelacion,this.idpac).subscribe(
      data=>{
        this.mdoalctr.dismiss(
          {data:3}
        )
      }
    )
  }


}
