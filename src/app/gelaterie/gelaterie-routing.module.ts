import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GelateriePage } from './gelaterie.page';

const routes: Routes = [
  {
    path: '',
    component: GelateriePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GelateriePageRoutingModule {}
