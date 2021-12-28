import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  logOut(){
    // localStorage.removeItem('isLoggedIn');
    localStorage.clear();
    this.router.navigate(['logout']);
    // window.location.reload();
  }

}
