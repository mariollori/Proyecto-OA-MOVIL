import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomepacPageRoutingModule } from './homepac-routing.module';

import { HomepacPage } from './homepac.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomepacPageRoutingModule
  ],
  declarations: [HomepacPage]
})
export class HomepacPageModule {}
