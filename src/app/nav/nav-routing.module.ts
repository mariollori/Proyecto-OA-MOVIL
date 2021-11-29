import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';


import { NavPage } from './nav.page';



const routes: Routes = [
  {
    path: '',
    component: NavPage,
    children:[
      {
        path: 'perfil',
        loadChildren:() => import('./perfil/perfil/perfil.module').then(m => m.PerfilPageModule)},
     
          {
            path: 'tabs',
            loadChildren: () => import('./listapac/tabs/tabs.module').then( m => m.TabsPageModule)
          },
    ]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule],
})
export class NavPageRoutingModule {}
