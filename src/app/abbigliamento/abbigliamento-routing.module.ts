import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbbigliamentoPage } from './abbigliamento.page';

const routes: Routes = [
  {
    path: '',
    component: AbbigliamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbbigliamentoPageRoutingModule {}
