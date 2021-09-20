import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PizzeriePage } from './pizzerie.page';

const routes: Routes = [
  {
    path: '',
    component: PizzeriePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PizzeriePageRoutingModule {}
