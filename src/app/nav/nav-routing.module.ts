import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { ListapacComponent } from './listapac/listapac/listapac.component';

import { NavPage } from './nav.page';
import { PerfilComponent } from './perfil/perfil/perfil.component';

const routes: Routes = [
  {
    path: '',
    component: NavPage,
    children:[
      {
        path: 'perfil',
        component: PerfilComponent, canActivate:[AuthGuard]},
        {
          path: 'listapac',
          component: ListapacComponent,canActivate:[AuthGuard]}
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule],
})
export class NavPageRoutingModule {}
