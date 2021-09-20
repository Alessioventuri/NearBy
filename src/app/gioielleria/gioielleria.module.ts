import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GioielleriaPageRoutingModule } from './gioielleria-routing.module';

import { GioielleriaPage } from './gioielleria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GioielleriaPageRoutingModule
  ],
  declarations: [GioielleriaPage]
})
export class GioielleriaPageModule {}
