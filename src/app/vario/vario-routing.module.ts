import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VarioPage } from './vario.page';

const routes: Routes = [
  {
    path: '',
    component: VarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VarioPageRoutingModule {}
