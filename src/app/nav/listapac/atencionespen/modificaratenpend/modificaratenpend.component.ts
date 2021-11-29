import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-modificaratenpend',
  templateUrl: './modificaratenpend.component.html',
  styleUrls: ['./modificaratenpend.component.scss'],
})
export class ModificaratenpendComponent implements OnInit {

  constructor(public navParams: NavParams, private mdoalctr: ModalController, public service:PacienteService) { }
 fecha;
 id
 hora;
  ngOnInit() {
    const key1 = this.navParams.get('data');
    console.log(key1)
    this.fecha = key1['fecha_sesion'];
    this.hora = key1['hora'];
    this.id= key1['idregistro_aten']

  }


  modificarfecha(){
    this.service.updatefecha(this.fecha,this.id,this.hora).subscribe(
      data=>{
        this.mdoalctr.dismiss(
          {data:0}
        )
      }
    )
  }
}
