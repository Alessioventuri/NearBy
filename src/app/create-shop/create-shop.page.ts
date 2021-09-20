import { Component, OnInit } from '@angular/core';

import { CrudService } from '../services/crud.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router} from "@angular/router"

declare var google;
@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.page.html',
  styleUrls: ['./create-shop.page.scss'],
})
export class CreateShopPage implements OnInit {
 
  shopForm : FormGroup;
  form : FormGroup;
  submitted = false;

  constructor(
    private crudService: CrudService,
    public formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.shopForm = this.formBuilder.group({
      kind:['',[Validators.required]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required,Validators.minLength(3) ]],
      civic_number: ['',[Validators.required]],
      city: ['',Validators.required],
      address: ['',[Validators.required]],
      lat : [''],
      lng : ['']
    })
  }

  get errorCtr() {
    return this.shopForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.shopForm.valid) {
      console.log('All fields are required.')
      return false;
    } else {
      const geocoder = new google.maps.Geocoder();
      //console.log(this.shopForm.get('address').value.toString())
      let address = this.shopForm.get('address').value.toString()
      //console.log(address)
      let civic = this.shopForm.get('civic_number').value
      let city = this.shopForm.get('city').value
      let add = address + ',' + civic + ',' + city;
     // console.log(add)

      geocoder.geocode({address : add}, (results) => {
        let a : any[] = results[0].geometry.location.toString();
   
        let b = [... a].join('').split(',')
        //console.log(parseFloat(b[0].replace('(','')),parseFloat(b[1]))
        this.form = this.formBuilder.group({
          kind: this.shopForm.get('kind').value,
          title: this.shopForm.get('title').value,
          description: this.shopForm.get('description').value,
          civic_number:this.shopForm.get('civic_number').value,
          city: this.shopForm.get('city').value,
          address: this.shopForm.get('address').value,
          lat : parseFloat(b[0].replace('(','')),
          lng: parseFloat(b[1])
        }); 
       // console.log(this.form.value)
      });
      this.crudService.create(this.form.value).then(()=>{
        this.shopForm.reset();
        this.form.reset();
        this.router.navigate(['/tabs']);
      }).catch((err) => {
        console.log(err)
      });
    }
  }
}
