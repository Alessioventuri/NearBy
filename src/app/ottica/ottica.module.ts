import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtticaPageRoutingModule } from './ottica-routing.module';

import { OtticaPage } from './ottica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtticaPageRoutingModule
  ],
  declarations: [OtticaPage]
})
export class OtticaPageModule {}
