import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  [x: string]: any;
  peopleForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }



  ngOnInit(): void {

    this.peopleForm = this.formBuilder.group({
      email: [''],
      password: [''],
    })
  }

  login() {
    console.log(this.peopleForm.value)
    let dataToSend = {

      'email': this.peopleForm.value.email,
      'password': this.peopleForm.value.password,
    };

    this.http.post<any>("http://localhost:3000/login", dataToSend)
      .subscribe(
        (res: any) => {

          alert("login successfully");
          this.router.navigateByUrl('registration');
        },
        error => {
          console.log("Error:", error);
          alert("Oops! Something went wrong");
        }
      );

  }
}
