import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtticaPage } from './ottica.page';

const routes: Routes = [
  {
    path: '',
    component: OtticaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtticaPageRoutingModule {}
