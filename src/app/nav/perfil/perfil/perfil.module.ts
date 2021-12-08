import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';
import { DatapersonalComponent } from '../datapersonal/datapersonal.component';
import { DataschoolComponent } from '../dataschool/dataschool.component';
import { HorariosComponent } from '../horarios/horarios.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule
  ],
  providers:[OneSignal]
,  declarations: [PerfilPage,DatapersonalComponent,DataschoolComponent,HorariosComponent]
})
export class PerfilPageModule {}
