import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RistorantiPage } from './ristoranti.page';

const routes: Routes = [
  {
    path: '',
    component: RistorantiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RistorantiPageRoutingModule {}
