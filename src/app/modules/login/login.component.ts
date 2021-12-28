import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup;
 
  loading = false;
  submitted = false;

  
  constructor(private router: Router,
    public formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private _auth: AuthenticationService,
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })

  }

  get f() { return this.loginForm.controls; }


  login() {
    localStorage.clear(); 

    this.submitted = true;
    this.httpClient.get<any>("http://localhost:3000/signupManager")
      .subscribe(res => {

        const user = res.find((a: any) => {
          return a.email === this.loginForm.value.email 
          && a.password === this.loginForm.value.password
        });

        if (user) {
          localStorage.setItem("isLoggedin","true");
          alert("Login Successfull");
          this.loginForm.reset();
          this.router.navigate(['/user/dash']);
        } else {
          alert("User not found!!")
          localStorage.clear();
        }
      }, err => {
        alert("Something went wrong!!")
      })

  }

 

 

}
