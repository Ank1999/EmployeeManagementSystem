import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  // login(email: string, password: string) {
  //   // this.httpClient.get<any>("http://localhost:3000/signupManager")
  //   //   .subscribe(res => {
  //   //     if (email == res.email && password == res.password) {
  //   //       localStorage.setItem('currentUser', "loggedin");
  //   //     }
  //   //   } )
  //   let msg = "";
  //   this.httpClient.get<any>("http://localhost:3000/signupManager")
  //     .subscribe(res => {

  //       console.log(res)

  //       // const user = res.find((a: any) => {
  //       //   // return a.email == email && a.password == password 
  //       res.forEach( (a:any) => {

  //         if (a.email == email  && a.password == password) {
  //           // alert("Login Successfull");
  //           msg = "login succesfull"
  //           return msg;

  //         } else {
  //           // alert("User not found!!")
  //           msg = "User not found"
  //           return msg;

  //         }
  //       })
  //     }
  //   );

  //   // });
  // }



}
