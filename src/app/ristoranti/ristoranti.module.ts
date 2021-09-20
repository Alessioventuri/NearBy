import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RistorantiPageRoutingModule } from './ristoranti-routing.module';

import { RistorantiPage } from './ristoranti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RistorantiPageRoutingModule
  ],
  declarations: [RistorantiPage]
})
export class RistorantiPageModule {}
