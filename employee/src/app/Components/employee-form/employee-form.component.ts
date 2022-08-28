import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})

export class EmployeeFormComponent implements OnInit {
  @ViewChild('f') Forms: NgForm;
  formData = [];
  employeeTypes: any;
  user = {
    name: "",
    surname: "",
    employeeType: "",
    dob: "",
  }
  enableEditIndex = null;
  isEditing: boolean = false;
  submitted = false;
  searchText;

  constructor(private httpService: HttpClient) { }

  ngOnInit(): void {
    this.httpService.get('https://ibillboard.com/api/positions').subscribe(
      data => {
        this.employeeTypes = data;
        this.employeeTypes = this.employeeTypes.positions
      });
  }

  onSubmit() {
    this.submitted = true;
    this.formData.push(this.Forms.value)
    this.Forms.reset();
  }

  deleteEmployee(rowIndex) {
    this.formData.splice(rowIndex, 1);
  }

  switchEditMode(i) {
    this.isEditing = true;
    this.enableEditIndex = i;
  }

  save() {
    this.isEditing = false;
    this.enableEditIndex = null;
  }

  changeEmployee($event) {
    console.log($event)
  }
}



