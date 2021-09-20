import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public foodList = ["Ristoranti","Pizzerie","Bar","Gelaterie","Altro"];
  public shopList = ["Tabaccheria","Abbigliamento","Vario"];
  showshop = false;
  showfood = false;
  ionViewWillEnter(){ 
    this.showfood = false;
    this.showshop = false;
  }
  showFood(){
    if (!this.showfood)
      this.showfood = true;
    else
      this.showfood = false;
  }
  showShop(){
    if ( !this.showshop)
      this.showshop = true;
    else
      this.showshop = false;
  }
}

