import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { PacienteService } from '../services/paciente.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.page.html',
  styleUrls: ['./nav.page.scss'],
})
export class NavPage implements OnInit {
  nombrecompleto;
  tipo;
  constructor(private service:PacienteService ,private menu: MenuController,private navCtrl: NavController,private token:TokenService) { }
  ngOnInit(): void {
    this.service.getuser(this.token.usuario.idpersonal).subscribe(
      data=>{
        console.log(data)
         this.tipo=data[0].tipo;
      
         this.nombrecompleto= data[0].nombre ;
      }
    )
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  rout(){
    this.navCtrl.navigateForward('nav/perfil/datapersonal');
    this.menu.close();
  }
  home(){
    this.navCtrl.navigateForward('nav/tabs/listapac');
    this.menu.close();
  }

  logout(){
    this.token.logout();
    this.navCtrl.navigateBack('login');
    
  }
}
