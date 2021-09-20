import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParrucchierePage } from './parrucchiere.page';

const routes: Routes = [
  {
    path: '',
    component: ParrucchierePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParrucchierePageRoutingModule {}
