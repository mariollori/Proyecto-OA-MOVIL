import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/services/paciente.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  nombrecompleto;
  telefono;
  tipo;
  correo;
  constructor(private service:PacienteService,private token:TokenService) { }

  ngOnInit() {
    console.log(this.token.usuario.idpersonal)
    this.service.getuser(this.token.usuario.idpersonal).subscribe(
      data=>{
    console.log(data)
       this.correo= data[0].correo;
       this.tipo= data[0].tipo;
         this.nombrecompleto= data[0].nombre ;
         this.telefono=data[0].telefono;
      }
    )
  }

}
