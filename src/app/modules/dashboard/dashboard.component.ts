import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ContentChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

import { EmployeeModel } from '../employee model';
import { EmployeeApiService } from '../employee-api.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  addForm !: FormGroup;

  empObj: EmployeeModel = new EmployeeModel();

  model: any ;

  empData !: any;

  todayDate: Date = new Date();

  datePipe: DatePipe = new DatePipe('en-Us');

  showAdd !: boolean;
  showUpdate !: boolean;

  submitted = false;

  date: string = "";

  selectedDate !:NgbDate|null;

  constructor(private router: Router,
    public formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private empApi: EmployeeApiService,
  ) {
    
  }

 
  get f() { return this.addForm.controls; }


  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      mobile: ['', [Validators.required,Validators.pattern(new RegExp("[0-9 ]{10}"))]],
      city: ['', [Validators.required]],
    })



    this.getAllEmployee();
  }

  select(model:any){  
    console.log(model);
  }


  onDateSelect(event: any) {
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;;
    let day = event.day <= 9 ? '0' + event.day : event.day;;
    this.date = year + "-" + month + "-" + day;
  } 



  clickAddEmp() {
    this.addForm.reset(); 
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails() {

    this.submitted = true;

    this.empObj.firstName = this.addForm.value.firstName;
    this.empObj.lastName = this.addForm.value.lastName;
    this.empObj.address = this.addForm.value.address;
    this.empObj.birthDate = this.date;
    this.empObj.mobile = this.addForm.value.mobile;
    this.empObj.city = this.addForm.value.city;

    if (this.addForm.valid) {
      this.empApi.postEmployee(this.empObj)
        .subscribe(res => {
          console.log(res);
          alert("Employee added successfully");

          let ref = document.getElementById('cancel');
          ref?.click();
          this.addForm.reset();
          this.getAllEmployee();
        }, err => {
          alert("Something went wrong");
        })
    }
  }

  getAllEmployee() {
    this.empApi.getEmployee().subscribe(res => {
      this.empData = res
    }, err => {
      alert("Something went wrong");
    })
  }

  onUpdate(row: any) {

    this.showAdd = false;
    this.showUpdate = true;

    // this.model = row.birthDate;

    this.empObj.id = row.id;
    this.addForm.controls['firstName'].setValue(row.firstName);
    this.addForm.controls['lastName'].setValue(row.lastName);
    this.addForm.controls['address'].setValue(row.address);
    let updatedDate= this.datePipe.transform(row.birthDate,'dd-MM-yyyy');
    let currentDate:Date= new Date(updatedDate+" 00:00:00");
    this.selectedDate= new NgbDate(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate());
    this.addForm.controls['birthDate'].setValue(this.selectedDate);
    this.addForm.controls['mobile'].setValue(row.mobile);
    this.addForm.controls['city'].setValue(row.city);
  }

  updateEmployee() {

    this.submitted = true;

    this.empObj.firstName = this.addForm.value.firstName;
    this.empObj.lastName = this.addForm.value.lastName;
    this.empObj.address = this.addForm.value.address;
    this.empObj.birthDate = this.date;
    this.empObj.mobile = this.addForm.value.mobile;
    this.empObj.city = this.addForm.value.city;

    if (this.addForm.valid) {
    this.empApi.updateEmployee(this.empObj, this.empObj.id).subscribe(res => {
      alert("Updated successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.addForm.reset();
      this.getAllEmployee();
    }, err => {
      alert("Something went wrong");
    })
  }
  }



  deleteEmployee(row: any) {
    this.empApi.deleteEmployee(row.id).subscribe(res => {
      alert("Employee deleted!!");
      this.getAllEmployee();
    },
      err => {
        alert("Something went wrong");
      })
  }

}
