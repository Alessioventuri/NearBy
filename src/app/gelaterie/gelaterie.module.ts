import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GelateriePageRoutingModule } from './gelaterie-routing.module';

import { GelateriePage } from './gelaterie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GelateriePageRoutingModule
  ],
  declarations: [GelateriePage]
})
export class GelateriePageModule {}
