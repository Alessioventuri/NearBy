import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParrucchierePageRoutingModule } from './parrucchiere-routing.module';

import { ParrucchierePage } from './parrucchiere.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParrucchierePageRoutingModule
  ],
  declarations: [ParrucchierePage]
})
export class ParrucchierePageModule {}
