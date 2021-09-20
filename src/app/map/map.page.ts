  import { Component,OnInit } from '@angular/core';
  import { ViewChild,ElementRef} from '@angular/core';
  import { Geolocation, Geoposition } from '@ionic-native/geolocation';
  import { CrudService } from './../services/crud.service';
  import { first } from 'rxjs/operators';


  export class Shop {
    $key: string;
    kind: any;
    title: string;
    description: string;
    city: string;
    address: string;
    civic_number: any;
    distance: any;
    time : any;
    lat : any;
    lng : any;
  } 
  declare var google : any; //happen that calling google api, you may get an error saying google is undefined

  @Component({
    selector: 'app-map',
    templateUrl: 'map.page.html',
    styleUrls: ['map.page.scss'],
  })
  export class MapPage{
    map : any;
    @ViewChild('map',{read: ElementRef, static: false}) mapRef: ElementRef;
      currentPosition : any;
    infoWindows : any = [];
    markersShop : any =[];
    markersRestaurant : any =[];

    public foodList : any[] = [];
    public foodListBackup : any[];
    public shopList : any[] = [];
    public shopListBackup : any[];

    constructor(private crudService: CrudService) {}
    ngOnInit() {
      this.showMap();
    }
    ionViewWillEnter(){
      this.showMap();
    }
    
    async initializeItemsRestau(): Promise<any> {
      const foodList = await this.crudService.getNormalRestaurants()
        .valueChanges().pipe(first()).toPromise();
      this.foodListBackup = foodList;
      return foodList;
    }
    async initializeItemsShop(): Promise<any> {
      const shopList = await this.crudService.getNormalShops()
        .valueChanges().pipe(first()).toPromise();
      this.shopListBackup = shopList;
      return shopList;
    }
  
    async showRestaurants(){
      this.hideShops(null);
      if(this.foodList.length == 0){
        this.foodList = await this.initializeItemsRestau();
      }
      this.foodList = this.foodList.filter(currentFood => {
        if (currentFood.title && "Ristorante") {
          return (currentFood.title.toLowerCase().indexOf("Ristorante".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Ristorante".toLowerCase()) > -1);
        }
      });
      for(let res of this.foodList){
        const marker = new google.maps.Marker({
          map: this.map,
          position: {'lat':res.lat, 'lng':res.lng},
          description : res.description,
          title: res.title,
          address: res.address + ',' + res.civic_number,
          city : res.city
        });
        this.markersRestaurant.push(marker);
        marker.setLabel("R");
       // marker.setIcon("http://maps.google.com/mapfiles/ms/micons/restaurant.png")
        marker.setMap(this.map);
        this.addInfoWindowToMarker(marker);      
      }   
    }
    async showPizza(){
      this.hideShops(null);
      if(this.foodList.length == 0){
        this.foodList = await this.initializeItemsRestau();
      }
      this.foodList = this.foodList.filter(currentFood => {
        if (currentFood.title && "Pizzeria") {
          return (currentFood.title.toLowerCase().indexOf("Pizzeria".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Pizzeria".toLowerCase()) > -1);
        }
      });
      for(let res of this.foodList){
        const marker = new google.maps.Marker({
          map: this.map,
          position: {'lat':res.lat, 'lng':res.lng},
          description : res.description,
          title: res.title,
          address: res.address + ',' + res.civic_number,
          city : res.city
        });
        this.markersRestaurant.push(marker);
        marker.setLabel("P");
       // marker.setIcon("http://maps.google.com/mapfiles/ms/micons/restaurant.png")
        marker.setMap(this.map);
        this.addInfoWindowToMarker(marker);      
      }   
    }
    async showCafe(){
      this.hideShops(null);
      if(this.foodList.length == 0){
        this.foodList = await this.initializeItemsRestau();
      }
      this.foodList = this.foodList.filter(currentFood => {
        if (currentFood.title && "Bar") {
          return (currentFood.title.toLowerCase().indexOf("Bar".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Bar".toLowerCase()) > -1);
        }
      });
      for(let res of this.foodList){
        const marker = new google.maps.Marker({
          map: this.map,
          position: {'lat':res.lat, 'lng':res.lng},
          description : res.description,
          title: res.title,
          address: res.address + ',' + res.civic_number,
          city : res.city
        });
        this.markersRestaurant.push(marker);
        marker.setLabel("C");
       // marker.setIcon("http://maps.google.com/mapfiles/ms/micons/restaurant.png")
        marker.setMap(this.map);
        this.addInfoWindowToMarker(marker);      
      }   
    }
    async showIce(){
      this.hideShops(null);
      if(this.foodList.length == 0){
        this.foodList = await this.initializeItemsRestau();
      }
      this.foodList = this.foodList.filter(currentFood => {
        if (currentFood.title ) {
          return (currentFood.title.toLowerCase().indexOf("Gelateria".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Gelateria".toLowerCase()) > -1);
        }
      });
      for(let res of this.foodList){
        const marker = new google.maps.Marker({
          map: this.map,
          position: {'lat':res.lat, 'lng':res.lng},
          description : res.description,
          title: res.title,
          address: res.address + ',' + res.civic_number,
          city : res.city
        });
        this.markersRestaurant.push(marker);
        marker.setLabel("I");
       // marker.setIcon("http://maps.google.com/mapfiles/ms/micons/restaurant.png")
        marker.setMap(this.map);
        this.addInfoWindowToMarker(marker);      
      }   
    }
    async showOther(){
      this.hideShops(null);
      if(this.foodList.length == 0){
        this.foodList = await this.initializeItemsRestau();
      }
      this.foodList = this.foodList.filter(currentFood => {
        if (currentFood.title ) {
          return (currentFood.description.toLowerCase().indexOf("Pub".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Pub".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Paninoteca".toLowerCase()) > -1
          || currentFood.description.toLowerCase().indexOf("Kebab".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Enoteca".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Cioccolateria".toLowerCase()) > -1
          || currentFood.description.toLowerCase().indexOf("Bistrò".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Pub".toLowerCase()) > -1
          || currentFood.description.toLowerCase().indexOf("Creperia".toLowerCase()) > -1);
        }
      });
      for(let res of this.foodList){
        const marker = new google.maps.Marker({
          map: this.map,
          position: {'lat':res.lat, 'lng':res.lng},
          description : res.description,
          title: res.title,
          address: res.address + ',' + res.civic_number,
          city : res.city
        });
        this.markersRestaurant.push(marker);
        marker.setLabel("O");
       // marker.setIcon("http://maps.google.com/mapfiles/ms/micons/restaurant.png")
        marker.setMap(this.map);
        this.addInfoWindowToMarker(marker);      
      }   
    }

    async showSiga(){
      this.hideRestaurant(null);
      if(this.shopList.length == 0){
        this.shopList = await this.initializeItemsShop();
      }
      this.shopList = this.shopList.filter(currentFood => {
        if (currentFood.title && "Tabaccheria") {
          return (currentFood.title.toLowerCase().indexOf("Tabaccheria".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Tabaccheria".toLowerCase()) > -1);
        }
      });
      for(let res of this.shopList){
          //this.map.setCenter(results[0].geometry.location);
          let marker = new google.maps.Marker({
            map: this.map,
            position: {'lat':res.lat, 'lng':res.lng},
            description : res.description,
            title: res.title,
            address: res.address + ',' + res.civic_number,
            city : res.city,
            //label: { color: '#00aaff', fontWeight: 'bold', fontSize: '14px', text: 'Your text here' },
          });
          this.markersShop.push(marker);
        //  marker.setIcon("")
          marker.setLabel("S");
          this.addInfoWindowToMarker(marker);
      }
    }
    async showJewel(){
      this.hideRestaurant(null);
      if(this.shopList.length == 0){
        this.shopList = await this.initializeItemsShop();
      }
      this.shopList = this.shopList.filter(currentFood => {
        if (currentFood.title && "Gioielleria") {
          return (currentFood.title.toLowerCase().indexOf("Gioielleria".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Gioielleria".toLowerCase()) > -1);
        }
      });
      for(let res of this.shopList){
          //this.map.setCenter(results[0].geometry.location);
          let marker = new google.maps.Marker({
            map: this.map,
            position: {'lat':res.lat, 'lng':res.lng},
            description : res.description,
            title: res.title,
            address: res.address + ',' + res.civic_number,
            city : res.city,
            //label: { color: '#00aaff', fontWeight: 'bold', fontSize: '14px', text: 'Your text here' },
          });
          this.markersShop.push(marker);
        //  marker.setIcon("")
          marker.setLabel("J");
          this.addInfoWindowToMarker(marker);
      }
    }
    async showDress(){
      this.hideRestaurant(null);
      if(this.shopList.length == 0){
        this.shopList = await this.initializeItemsShop();
      }
      this.shopList = this.shopList.filter(currentFood => {
        if (currentFood.title && "Abbigliamento") {
          return (currentFood.title.toLowerCase().indexOf("Abbigliamento".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Abbigliamento".toLowerCase()) > -1
          || currentFood.description.toLowerCase().indexOf("Scarpe".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Abiti".toLowerCase()) > -1
          || currentFood.description.toLowerCase().indexOf("Moda".toLowerCase()) > -1);
        }
      });
      for(let res of this.shopList){
          let marker = new google.maps.Marker({
            map: this.map,
            position: {'lat':res.lat, 'lng':res.lng},
            description : res.description,
            title: res.title,
            address: res.address + ',' + res.civic_number,
            city : res.city,
            //label: { color: '#00aaff', fontWeight: 'bold', fontSize: '14px', text: 'Your text here' },
          });
          this.markersShop.push(marker);
        //  marker.setIcon("")
          marker.setLabel("D");
          this.addInfoWindowToMarker(marker);
      }
    }
    async showGlasses(){
      this.hideRestaurant(null);
      if(this.shopList.length == 0){
        this.shopList = await this.initializeItemsShop();
      }
      this.shopList = this.shopList.filter(currentFood => {
        if (currentFood.title && "Ottica") {
          return (currentFood.title.toLowerCase().indexOf("Ottica".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Ottica".toLowerCase()) > -1
          || currentFood.description.toLowerCase().indexOf("Ottico".toLowerCase()) > -1);
        }
      });
      for(let res of this.shopList){
          //this.map.setCenter(results[0].geometry.location);
          let marker = new google.maps.Marker({
            map: this.map,
            position: {'lat':res.lat, 'lng':res.lng},
            description : res.description,
            title: res.title,
            address: res.address + ',' + res.civic_number,
            city : res.city,
            //label: { color: '#00aaff', fontWeight: 'bold', fontSize: '14px', text: 'Your text here' },
          });
          this.markersShop.push(marker);
        //  marker.setIcon("")
          marker.setLabel("O");
          this.addInfoWindowToMarker(marker);
      }
    }
    async showHair(){
      this.hideRestaurant(null);
      if(this.shopList.length == 0){
        this.shopList = await this.initializeItemsShop();
      }
      for(let res of this.shopList){
          //this.map.setCenter(results[0].geometry.location);
          let marker = new google.maps.Marker({
            map: this.map,
            position: {'lat':res.lat, 'lng':res.lng},
            description : res.description,
            title: res.title,
            address: res.address + ',' + res.civic_number,
            city : res.city,
            //label: { color: '#00aaff', fontWeight: 'bold', fontSize: '14px', text: 'Your text here' },
          });
          this.markersShop.push(marker);
        //  marker.setIcon("")
          marker.setLabel("Hair");
          this.addInfoWindowToMarker(marker);
      }
    }
    async showVario(){
      this.hideRestaurant(null);
      if(this.shopList.length == 0){
        this.shopList = await this.initializeItemsShop();
      }
      this.shopList = this.shopList.filter(currentFood => {
        if (currentFood.title ) {
          return (currentFood.description.toLowerCase().indexOf("Orologi".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Prodotti".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Paninoteca".toLowerCase()) > -1
          || currentFood.description.toLowerCase().indexOf("Musica".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Regali".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Cioccolateria".toLowerCase()) > -1
          || currentFood.description.toLowerCase().indexOf("Giocattoli".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Telefoni".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Libreria".toLowerCase()) > -1
          || currentFood.description.toLowerCase().indexOf("Profumeria".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Elettronica".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Laboratorio".toLowerCase()) > -1
          || currentFood.description.toLowerCase().indexOf("Scommesse".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Copisteria".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Cartol".toLowerCase()) > -1
          || currentFood.description.toLowerCase().indexOf("Fiori".toLowerCase()) > -1)|| currentFood.description.toLowerCase().indexOf("Ferra".toLowerCase()) > -1 || currentFood.description.toLowerCase().indexOf("Farmacia".toLowerCase()) > -1
          || currentFood.description.toLowerCase().indexOf("Laboratorio".toLowerCase()) > -1;
        }
      });
      for(let res of this.shopList){
          //this.map.setCenter(results[0].geometry.location);
          let marker = new google.maps.Marker({
            map: this.map,
            position: {'lat':res.lat, 'lng':res.lng},
            description : res.description,
            title: res.title,
            address: res.address + ',' + res.civic_number,
            city : res.city,
            //label: { color: '#00aaff', fontWeight: 'bold', fontSize: '14px', text: 'Your text here' },
          });
          this.markersShop.push(marker);
        //  marker.setIcon("")
          marker.setLabel("V");
          this.addInfoWindowToMarker(marker);
      }
    }

    hideAll(){
      this.hideShops(null);
      this.hideRestaurant(null);
    }
    hideShops(map){
        for (let i = 0; i < this.markersShop.length; i++) {
          this.markersShop[i].setMap(map);
        }
    }
    hideRestaurant(map){
      for (let i = 0; i < this.markersRestaurant.length; i++) {
        this.markersRestaurant[i].setMap(map);
      }
    }

    addInfoWindowToMarker(marker){
      let infoWindowContent = '';
      if (marker.title != 'Current Position'){
        infoWindowContent = '<div id="content">' + 
                                  '<h3 id="firstHeading" class"firstHeading">' + marker.title + '</h3>' +
                                  '<p>'+ marker.description + '</p>' + 
                                  '<p>' + marker.address + ', ' + marker.city + '</p>' + 
                                  '<ion-button id="navigate">Navigate</ion-button>' +
                                '</div>';
      }else{
        infoWindowContent = '<div id="content">' + 
                                  '<h2 id="firstHeading" class"firstHeading">' + marker.title + '</h2>' +
                                  '<ion-button id="navigate">Navigate</ion-button>' +
                                '</div>';
      }
      let infoWindow = new google.maps.InfoWindow({
        content : infoWindowContent
      });

      marker.addListener('click', () => {
        this.closeAllInfoWindows();
        infoWindow.open(this.map,marker);

        google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
          document.getElementById('navigate').addEventListener('click', () => {
            console.log('navigate button clicked!');
            //code to navigate using google maps app
            window.open('https://www.google.com/maps/dir/?api=1&origin='+ 
            this.currentPosition.coords.latitude + ',' + 
            this.currentPosition.coords.longitude + '&destination=' + 
              marker.position + '&travelmode=walking');
          });
        });
      });

      this.infoWindows.push(infoWindow);
    }

    closeAllInfoWindows(){
      for(let window of this.infoWindows){
        window.close();
      }
    }

    showMap(){
      const geocoder = new google.maps.Geocoder();
      Geolocation.getCurrentPosition().then((position) =>{
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.currentPosition = position;
        let options = {
          center : latLng,
          zoom : 18,
          disableDefaultUI: true,
          mapId: 'xxxxxxxxxxxxxx',
        }
        this.map = new google.maps.Map(this.mapRef.nativeElement, options);
        this.setPosition(this.currentPosition);
      //  this.addMarkersToMap(this.markers);
      });
    }

    setPosition(position: Geoposition){
      var marker = null;
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      var myLatLon = new google.maps.LatLng(lat, long);
      marker = new google.maps.Marker({
          position: myLatLon,
          title : 'Current Position',
          latitude: lat,
          longitude: long
        });
      marker.setMap(this.map);
      this.addInfoWindowToMarker(marker);
    }; 
  
  }
