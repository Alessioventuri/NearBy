import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltroPageRoutingModule } from './altro-routing.module';

import { AltroPage } from './altro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltroPageRoutingModule
  ],
  declarations: [AltroPage]
})
export class AltroPageModule {}
