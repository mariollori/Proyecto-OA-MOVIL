import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { ListapacComponent } from '../listapac/listapac.component';
import { MenupopoverComponent } from '../../menu/menupopover/menupopover.component';
import { DetallePacComponent } from '../../detailpaciente/detalle-pac/detalle-pac.component';
import { RegistroAtencionComponent } from '../../registro_atencion/registro-atencion/registro-atencion.component';
import { AtenPendientesComponent } from '../atencionespen/aten-pendientes/aten-pendientes.component';
import { CancelaratenComponent } from '../cancelaratencion/cancelaraten/cancelaraten.component';
import { ModificaratenpendComponent } from '../atencionespen/modificaratenpend/modificaratenpend.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [TabsPage,ListapacComponent,MenupopoverComponent,DetallePacComponent,RegistroAtencionComponent, AtenPendientesComponent,CancelaratenComponent,ModificaratenpendComponent]
})
export class TabsPageModule {}
