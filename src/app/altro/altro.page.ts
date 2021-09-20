import { Component, OnInit } from '@angular/core';
import { CrudService } from './../services/crud.service';
import { Geolocation } from '@ionic-native/geolocation';
import { first } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-altro',
  templateUrl: './altro.page.html',
  styleUrls: ['./altro.page.scss'],
})
export class AltroPage implements OnInit {

  public foodList : any[];
  public foodListBackup : any[];
  showLoader: boolean;
  show : boolean;


  constructor(private crudService: CrudService,
              private alert: AlertController) { }
              
  async ngOnInit() {
    this.foodList = await this.initializeItems();
    this.foodList = this.foodList.filter(currentFood => {
      if (currentFood.title ) {
        return (currentFood.description.toLowerCase().indexOf("Pub".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Pub".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Paninoteca".toLowerCase()) > -1
        || currentFood.description.toLowerCase().indexOf("Kebab".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Enoteca".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Cioccolateria".toLowerCase()) > -1
        || currentFood.description.toLowerCase().indexOf("Bistrò".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Pub".toLowerCase()) > -1
        || currentFood.description.toLowerCase().indexOf("Creperia".toLowerCase()) > -1);
      }
    });
    this.distance();
  }
  
  async initializeItems(): Promise<any> {
    const foodList = await this.crudService.getNormalRestaurants()
      .valueChanges().pipe(first()).toPromise();
    this.foodListBackup = foodList;

    return foodList;
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
      for(let food of this.foodList){
        food.distance = this.getDistanceFromLatLonInKm(position.coords.latitude,position.coords.longitude,food.lat,food.lng);
        food.time = (food.distance/83).toFixed()
      }
    }).finally(() => {
      this.hideProgressBar();
      this.function(this.foodList)
      this.foodListBackup = this.foodList 


    })
  }
  open(){
    window.open("")
  }

  remove(id){
    console.log(id);
    if(window.confirm('Are you sure?')){
      this.crudService.deleteRestaurant(id);
    }
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

  navigate(lat, lng,){

    Geolocation.getCurrentPosition().then((position) =>{
      window.open('https://www.google.com/maps/dir/?api=1&origin='+ 
            position.coords.latitude + ',' + 
            position.coords.longitude + '&destination=' + 
              lat + ',' + lng + '&travelmode=walking');
    });
  }

  async filterList(evt) {
    this.foodList = this.foodListBackup;
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.foodList = this.foodList.filter(currentFood => {
      if (currentFood.title && searchTerm) {
        return (currentFood.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }
  
  function(arr) {
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

