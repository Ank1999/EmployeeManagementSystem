import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password:  ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  get f() { return this.loginForm.controls; }


  login(){
    this.submitted = true;
    this.httpClient.get<any>("http://localhost:3000/signupManager")
      .subscribe(res => {

        const user = res.find((a:any)=>{
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password 
        });

        if(user){
          alert("Login Successfull");
          this.loginForm.reset();
          this.router.navigate(['/']);
        }else{
          alert("User not found!!")
        }
      }, err => {
        alert("Something went wrong!!")
      } )

  }

}
