import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email',
  templateUrl: './email.page.html',
  styleUrls: ['./email.page.scss'],
})
export class EmailPage implements OnInit {

  form : FormGroup;
  honeypot: FormControl = new FormControl(''); // used to prevent spam
  submitted : boolean = false; // show and hide the success message
  isLoading : boolean = false; //disable the submit button if we're loading
  responseMessage: string; // the response message to show to the user

  constructor(private formBuilder: FormBuilder, private http: HttpClient, 
    private alert: AlertController,
    private router: Router) {}

  get errorCtr() {
    return this.form.controls;
  }

  async presentAlertError() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: '',
      message: '"Oops! Qualcosa è andato storto... Ricarica la pagina e riprova ancora.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentAlertSuccess() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Successo',
      subHeader: '',
      message: "Grazie per il messaggio! Ti risponderò appena possibile!",
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name : ['',[Validators.required]],
      email : ['',[Validators.required,Validators.email]],
      title : ['',[Validators.required]],
      type: ['',[Validators.required]],
      description: ['',[Validators.required,Validators.maxLength(256)]],
      address : ['',[Validators.required]],
      civic_number : ['',[Validators.required]],
      city : ['',[Validators.required]],
      reason: ['',Validators.required],
      honeypot : this.honeypot
    })
  }

  onSubmit(){
    this.submitted = true;
    if(this.form.valid && this.honeypot.value == ""){
      this.form.disable();
      var formData : any = new FormData();
      formData.append("name",this.form.get("name").value);
      formData.append("email",this.form.get("email").value);
      formData.append("title",this.form.get("title").value);
      formData.append("type",this.form.get("type").value);
      console.log(this.form.get("type").value);
      formData.append("description",this.form.get("description").value);
      formData.append("address",this.form.get("address").value);
      formData.append("civic_number",this.form.get("civic_number").value);
      formData.append("city",this.form.get("city").value);
      formData.append("reason",this.form.get("reason").value);
      console.log(formData);

      this.isLoading = true;
      this.submitted = false;
      this.http.post("https://script.google.com/macros/s/AKfycbwpT5gbF8A26-RiKERQ8sBqpJ6hwRkDWow0hL5VS44iTid1zwU/exec",formData).subscribe(
        (response) =>{
          console.log(response["result"]);
          if(response["result"] == "success"){
            this.responseMessage = "Grazie per il messaggio! Ti risponderò appena possibile!"
          }else{
            this.responseMessage = "Oops! Qualcosa è andato storto... Ricarica la pagine e riprova."
          }
          this.form.enable();
          this.isLoading = false;
          this.submitted = true;
          console.log(this.isLoading)
          this.router.navigate(['/tabs'])
          this.presentAlertSuccess();
          this.form.reset();
        },
        (error) => {
          this.responseMessage = "Oops! Qualcosa è andato storto... Ricarica la pagine e riprova."
          this.form.enable();
          this.isLoading = false;
          this.submitted = true;
          console.log(error);
          this.presentAlertError();
        }
      ) 
    }
    else{
      console.log("All field are required!")
      return false;
      }
  }
  
}
