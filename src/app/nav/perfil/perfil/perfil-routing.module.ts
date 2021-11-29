import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { DatapersonalComponent } from '../datapersonal/datapersonal.component';
import { DataschoolComponent } from '../dataschool/dataschool.component';
import { HorariosComponent } from '../horarios/horarios.component';

import { PerfilPage } from './perfil.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilPage,
    children:[
      {path: 'datapersonal',
      component: DatapersonalComponent, canActivate:[AuthGuard]},
      {path: 'dataschool',
      component: DataschoolComponent, canActivate:[AuthGuard]},
      {path: 'horarios',
      component: HorariosComponent, canActivate:[AuthGuard]},
      
      
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilPageRoutingModule {}
