import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VarioPageRoutingModule } from './vario-routing.module';

import { VarioPage } from './vario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VarioPageRoutingModule
  ],
  declarations: [VarioPage]
})
export class VarioPageModule {}
