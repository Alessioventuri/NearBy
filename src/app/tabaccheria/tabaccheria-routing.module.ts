import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabaccheriaPage } from './tabaccheria.page';

const routes: Routes = [
  {
    path: '',
    component: TabaccheriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabaccheriaPageRoutingModule {}
