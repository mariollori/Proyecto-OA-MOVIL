import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NavPageRoutingModule } from './nav-routing.module';

import { NavPage } from './nav.page';
import { ListapacComponent } from './listapac/listapac/listapac.component';
import { MenupopoverComponent } from './menu/menupopover/menupopover.component';
import { DetallePacComponent } from './detailpaciente/detalle-pac/detalle-pac.component';
import { RegistroAtencionComponent } from './registro_atencion/registro-atencion/registro-atencion.component';


@NgModule({
  
  imports: [
  
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NavPageRoutingModule
  ],
  declarations: [NavPage, ListapacComponent,MenupopoverComponent,DetallePacComponent,RegistroAtencionComponent]
})
export class NavPageModule {}
