import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbbigliamentoPageRoutingModule } from './abbigliamento-routing.module';

import { AbbigliamentoPage } from './abbigliamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbbigliamentoPageRoutingModule
  ],
  declarations: [AbbigliamentoPage]
})
export class AbbigliamentoPageModule {}
