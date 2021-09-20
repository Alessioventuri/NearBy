import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PizzeriePageRoutingModule } from './pizzerie-routing.module';

import { PizzeriePage } from './pizzerie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PizzeriePageRoutingModule
  ],
  declarations: [PizzeriePage]
})
export class PizzeriePageModule {}
