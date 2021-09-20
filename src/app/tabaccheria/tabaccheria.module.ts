import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabaccheriaPageRoutingModule } from './tabaccheria-routing.module';

import { TabaccheriaPage } from './tabaccheria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabaccheriaPageRoutingModule
  ],
  declarations: [TabaccheriaPage]
})
export class TabaccheriaPageModule {}
