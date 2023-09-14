import { Component } from '@angular/core';

import { FormGroup,FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  [x:string] : any;
  userform: FormGroup;


  urls: any;

 
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(){
    this.userform=this.formBuilder.group({
      image_pc:null,
      user_name:[''],
      phone_no:[''],
      email:[''],
      password:['']
    })
  }
 

  imageSrc: string | ArrayBuffer | null = null;

  previewImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.userform.get('image_pc').setValue(file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }


// Call the Function::

done(){
  console.log(this.userform.value)

  let headers = new HttpHeaders();
  const dataToSend = new FormData();
  dataToSend.append('user_name', this.userform.value.user_name);
  dataToSend.append('phone_no', this.userform.value.phone_no);
  dataToSend.append('email', this.userform.value.email);
  dataToSend.append('password', this.userform.value.password);
  dataToSend.append('image_pc', this.userform.value.image_pc);
      headers = headers.append('enctype', 'multipart/form-data');

    this.http.post<any>("http://localhost:3000/registration", dataToSend)


      .subscribe(
        (res: any) => {  
          alert("Registration successfully");
             this.router.navigateByUrl('login');
        },
        error => {
          console.log("Error:", error);
          alert("Oops! Something went wrong method");
        }
      );
}
}
