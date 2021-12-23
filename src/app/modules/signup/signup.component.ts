import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup;

  constructor(private router: Router,
    public formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) { }

  loading = false;
  submitted = false;

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      birthdate: ['', [Validators.required]],
    })
  }

  get f() { return this.signupForm.controls; }


  signUp() {
    this.submitted = true;
    if (this.signupForm.valid) {
      this.httpClient.post<any>("http://localhost:3000/signupManager", this.signupForm.value)
        .subscribe(res => {
          console.log(res)
          alert("SignUp Successfull");
          this.signupForm.reset();
          this.router.navigate(['/login']);


        }, err => {
          alert("Something went wrong!!")
        })

    }
  }

}
