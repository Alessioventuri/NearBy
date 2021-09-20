import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CreateShopPageRoutingModule } from './create-shop-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateShopPage } from './create-shop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateShopPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateShopPage]
})
export class CreateShopPageModule {}
