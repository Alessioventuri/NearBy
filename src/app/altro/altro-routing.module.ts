import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AltroPage } from './altro.page';

const routes: Routes = [
  {
    path: '',
    component: AltroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AltroPageRoutingModule {}
