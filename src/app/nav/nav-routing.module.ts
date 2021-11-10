import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';


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
            path: 'tabs',
            loadChildren: () => import('./listapac/tabs/tabs.module').then( m => m.TabsPageModule)
          },
    ]
  },
 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule],
})
export class NavPageRoutingModule {}
