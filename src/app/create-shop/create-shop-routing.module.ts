import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateShopPage } from './create-shop.page';

const routes: Routes = [
  {
    path: '',
    component: CreateShopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateShopPageRoutingModule {}
