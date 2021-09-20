import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from "@angular/router";

export class Shop {
  $key: string;
  kind: any;
  title: string;
  description: string;
  city: string;
  address: string;
  civic_number : any;
  distance: any;
  lat : any;
  lng : any;
  
} 
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private ngFirestore: AngularFirestore,
    private router: Router
  ) { }

  create1(shop: Shop){
    return this.ngFirestore.collection('prova').add(shop);
  }
  create(shop: Shop){
    if (shop.kind == "restaurants")
      return this.ngFirestore.collection('restaurants').add(shop);
    else
      return this.ngFirestore.collection('shops').add(shop);
  }

  getShop(){
    return this.ngFirestore.collection('shops').snapshotChanges();
  }

  getRestaurant(){
    return this.ngFirestore.collection('restaurants').snapshotChanges();
  }

  getShopId(id){
    return this.ngFirestore.collection('shops').doc(id).valueChanges();
  }

  getRestaurantId(id){
    return this.ngFirestore.collection('restaurants').doc(id);
  }

  getProva(){
    return this.ngFirestore.collection('prova');
  }

  getNormalRestaurants(){
    return this.ngFirestore.collection('restaurants');
  }

  getNormalShops(){
    return this.ngFirestore.collection('shops');
  }

  deleteShop(id:string){
    this.ngFirestore.doc('shops/' + id).delete();
  }
  
  deleteRestaurant(id:string){
    this.ngFirestore.doc('restaurants/' + id).delete();
  }
}

