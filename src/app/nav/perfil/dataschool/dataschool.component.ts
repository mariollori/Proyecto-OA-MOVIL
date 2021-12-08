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
  tipo;
  constructor(private service:PacienteService,private token:TokenService,public loadingController: LoadingController) { }
  
  personal=new Personal();
 

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
       this.tipo=data[0].tipo;
       this.personal= data[0]; 
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

      this.personal.idpersonal= this.token.usuario.idpersonal;
      this.presentLoading('Guardando');
      this.service.changedatasch(this.personal,this.tipo).subscribe(
        data=>{
          this.loading.dismiss();
          this.llamardata();
          this.editstate=false;
        }
      )
    }
}
