import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Paciente } from 'src/app/models/paciente';

@Component({
  selector: 'app-detalle-pac',
  templateUrl: './detalle-pac.component.html',
  styleUrls: ['./detalle-pac.component.scss'],
})
export class DetallePacComponent implements OnInit {
  pac = new Paciente();
  nombre :String;
  constructor(public navParams: NavParams, private mdoalctr : ModalController) { }

  ngOnInit() {
    const key1= this.navParams.get('data');
    this.nombre = key1['nombre'];
     this.pac.descripcion = key1['descripcion'];
     this.pac.motivo = key1['motivo'];
     this.pac.edad = key1['edad'];
   console.log(key1)
  }


  cerrar(){
    this.mdoalctr.dismiss();
  }
}
