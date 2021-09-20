import { Component, OnInit } from '@angular/core';
import { CrudService } from './../services/crud.service';
import { Geolocation } from '@ionic-native/geolocation';
import { first } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-abbigliamento',
  templateUrl: './abbigliamento.page.html',
  styleUrls: ['./abbigliamento.page.scss'],
})
export class AbbigliamentoPage implements OnInit {

  public shopList : any[];
  public shopListBackup : any[];
  showLoader: boolean;
  show : boolean;
  showList = false;


  constructor(private crudService: CrudService,
              private alert : AlertController) {}

  async ngOnInit() {
    this.shopList = await this.initializeItems();
    this.shopList = this.shopList.filter(currentFood => {
      if (currentFood.title && "Abbigliamento") {
        return (currentFood.title.toLowerCase().indexOf("Abbigliamento".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Abbigliamento".toLowerCase()) > -1
        || currentFood.description.toLowerCase().indexOf("Scarpe".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Abiti".toLowerCase()) > -1
        || currentFood.description.toLowerCase().indexOf("Moda".toLowerCase()) > -1);
      }
    });
    this.distance();
  }
  async presentAlertSuccess(restaurant) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: restaurant.title,
      subHeader: '',
      message: restaurant.description,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  async initializeItems(): Promise<any> {
    const foodList = await this.crudService.getNormalShops()
      .valueChanges().pipe(first()).toPromise();
    this.shopListBackup = foodList;
    return foodList;
  }

  showProgressBar() {
    this.showLoader = true;
    this.show = false;
  }

  hideProgressBar() {
    this.showLoader = false;
    this.show = true;
  }

  distance(){
    this.showProgressBar();
    Geolocation.getCurrentPosition().then((position) =>{
      for(let shop of this.shopList){
        shop.distance = this.getDistanceFromLatLonInKm(position.coords.latitude,position.coords.longitude,shop.lat,shop.lng);
        shop.time = (shop.distance/83).toFixed()
      }
    }).finally(() => {
      this.orderByDistance(this.shopList)
      this.hideProgressBar();
      this.shopListBackup = this.shopList
    })
  }

  navigate(lat, lng){
    Geolocation.getCurrentPosition().then((position) =>{
      window.open('https://www.google.com/maps/dir/?api=1&origin='+ 
            position.coords.latitude + ',' + 
            position.coords.longitude + '&destination=' + 
              lat + ',' + lng + '&travelmode=walking');
    });
  }

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = (R * c * 1000).toFixed(1); // Distance in km
    let di = parseFloat(d)
    let dist = parseFloat(di.toFixed()) 
    return dist ;
  }
  
  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  async filterList(evt) {
    this.shopList = this.shopListBackup;
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      return;
    }
    this.shopList = this.shopList.filter(currentShop => {
      if (currentShop.title && searchTerm) {
        return (currentShop.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || currentShop.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }
  
  orderByDistance(arr) {
    if(arr.length < 0 || !Array.isArray(arr)) {
      throw new Error();
    }
    for(var i=0; i < arr.length -1 ; i++) {
      for(var x=0; x < arr.length - 1; x++) {
        if(arr[x].distance > arr[x+1].distance) {
          var theGreater = arr[x];
          arr[x] = arr[x + 1]; 
          arr[x+1] = theGreater;
        }
      }
    }
  };
}
