import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
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
       this.tipo= data[0].tipo.toUpperCase();
         this.nombrecompleto= data[0].nombre + ' ' +  data[0].apellido;
         this.telefono=data[0].telefono;
      }
    )
  }

}
