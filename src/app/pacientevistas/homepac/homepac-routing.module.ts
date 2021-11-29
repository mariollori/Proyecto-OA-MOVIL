import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepacPage } from './homepac.page';

const routes: Routes = [
  {
    path: '',
    component: HomepacPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepacPageRoutingModule {}
