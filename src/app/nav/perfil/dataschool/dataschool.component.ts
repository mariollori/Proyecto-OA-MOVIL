import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Personal } from 'src/app/models/personal';
import { PacienteService } from 'src/app/services/paciente.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-dataschool',
  templateUrl: './dataschool.component.html',
  styleUrls: ['./dataschool.component.scss'],
})
export class DataschoolComponent implements OnInit {
  editstate=false;
  constructor(private service:PacienteService,private token:TokenService,public loadingController: LoadingController) { }
  universidad;

  ciclo;
  grado_academico;
  personal=new Personal();
  grupo;
  edad;

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
    this.service.getuser(this.token.usuario.idpersonal).subscribe(
      data=>{
    console.log(data)
       this.universidad= data[0].universidad;
       this.ciclo= data[0].ciclo;
       this.grado_academico=data[0].grado_academico;
         this.grupo= data[0].grupo ;
         this.edad=data[0].edad;
       
      }
    )
  }
  
  activar(){
      this.editstate=true;
      console.log(this.editstate)
    }
    desactive(){
      this.editstate=false;
      this.personal = new Personal();
      this.llamardata();
  
    }
    save(){
     
      this.personal.universidad = this.universidad;
      this.personal.ciclo=this.ciclo;
      this.personal.grupo=this.grupo;
      this.personal.edad=this.edad;
      this.personal.idpersonal= this.token.usuario.idpersonal;
      this.personal.grado_academico=this.grado_academico;
      this.presentLoading('Guardando');
      this.service.changedatasch(this.personal).subscribe(
        data=>{
          this.loading.dismiss();
          this.personal=new Personal();
          this.llamardata();
          this.editstate=false;
        }
      )
    }
}
