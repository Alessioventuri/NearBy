import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GioielleriaPage } from './gioielleria.page';

const routes: Routes = [
  {
    path: '',
    component: GioielleriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GioielleriaPageRoutingModule {}
