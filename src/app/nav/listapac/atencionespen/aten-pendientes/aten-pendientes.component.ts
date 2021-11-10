import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/services/paciente.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-aten-pendientes',
  templateUrl: './aten-pendientes.component.html',
  styleUrls: ['./aten-pendientes.component.scss'],
})
export class AtenPendientesComponent implements OnInit {

  constructor(private pacserv: PacienteService, private token:TokenService) { }
data:any=[];
  ngOnInit() {


    this.pacserv.getatencion_pend(this.token.usuario.idpersonal).subscribe(
      (data)=>{
        console.log(data)
        this.data=  data}
    )

  }

}
