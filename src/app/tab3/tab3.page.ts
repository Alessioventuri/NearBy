import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CrudService } from '../services/crud.service';
import { first } from 'rxjs/operators';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page  {
  timeForm: FormGroup;
  submitted = false;
  foodList : any;
  foodListBackup: any;
  showLoader: boolean;
  show = false;

  constructor(public formBuilder: FormBuilder,
              private crudService: CrudService,
              private alert: AlertController){
                this.timeForm = this.formBuilder.group({
                  time:['',[Validators.required]],
                  type:['',[Validators.required]]
                })
  }
  
  ionViewWillEnter(){ 
    this.timeForm.reset();
    this.timeForm.clearAsyncValidators();
    this.timeForm.clearValidators();
    this.show = false;
  }
  
  async initializeItemsRestaurants(){
    const foodList = await this.crudService.getNormalRestaurants()
      .valueChanges().pipe(first()).toPromise()
    this.foodListBackup = foodList;
    return foodList;
  }

  async initializeItemsShops(){
    const foodList = await this.crudService.getNormalShops()
      .valueChanges().pipe(first()).toPromise()
    this.foodListBackup = foodList;
    return foodList;
  }

  get errorCtr() {
    return this.timeForm.controls;
  }

  async onSubmit() {
    this.submitted = true;
    this.show = false;
    if (!this.timeForm.valid) {
      console.log('All fields are required.')
      return false;
    } else {
      if (this.timeForm.value.type == "restaurants")
        this.foodList = await this.initializeItemsRestaurants();
      else
        this.foodList = await this.initializeItemsShops();
      let currentFood = this.foodListBackup
      await this.distance(currentFood);
    }
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

  navigate(address, civic_number,city){
    Geolocation.getCurrentPosition().then((position) =>{
      window.open('https://www.google.com/maps/dir/?api=1&origin='+ 
            position.coords.latitude + ',' + 
            position.coords.longitude + '&destination=' + 
              address + ',' + civic_number + ','+ city);
    });
  }

  showProgressBar() {
    this.showLoader = true;
  }

  hideProgressBar() {
    this.showLoader = false;
  }

  async distance(currentFood){
    this.showProgressBar();
    Geolocation.getCurrentPosition().then((position) =>{
      for(let shop of currentFood){
        shop.distance = this.getDistanceFromLatLonInKm(position.coords.latitude,position.coords.longitude,shop.lat,shop.lng);
        shop.time = (shop.distance/83).toFixed()
        //console.log(shop.distance, shop.time)
      }
    }).finally(() => {
      this.hideProgressBar();
    //  console.log(currentFood);
      this.foodList = currentFood.filter(currentShop => {
       // console.log(currentShop.time)
        return (parseInt(currentShop.time) < parseInt(this.timeForm.value.time)/3); 
    });
    this.function(this.foodList)
    this.show = true;
    })
  }

  function(arr) {
    if(arr.length < 0 || !Array.isArray(arr)) {
      throw new Error();
    }

    for(var i=0; i < arr.length -1 ; i++) {
      for(var x=0; x < arr.length - 1; x++) {
        if(arr[x].time > arr[x+1].time) {
          var theGreater = arr[x];
          arr[x] = arr[x + 1]; 
          arr[x+1] = theGreater;
        }
      }
    }
  };

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat =  this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos( this.deg2rad(lat1)) * Math.cos(  this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = (R * c * 1000).toFixed(1); // Distance in km
    let di = parseFloat(d)
    let dist = parseFloat(di.toFixed()) 
   // console.log(dist)
    return dist ;
  }
  
  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
}

