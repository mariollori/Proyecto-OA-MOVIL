import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AtenPendientesComponent } from '../atencionespen/aten-pendientes/aten-pendientes.component';
import { ListapacComponent } from '../listapac/listapac.component';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
        {
          path: 'listapac',
          component: ListapacComponent,canActivate:[AuthGuard]},
          {
            path: 'aten_pend',
            component: AtenPendientesComponent,canActivate:[AuthGuard]},
        
    ]
  }
  
 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
