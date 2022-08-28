import { Component, OnInit } from '@angular/core';
import { EmployeeDetails } from 'src/app/Models/employeeDetails';
import { EMPLOYEES } from 'src/app/Models/mock-employeesDetails';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})

export class EmployeeDetailsComponent implements OnInit {
  employees = EMPLOYEES;
  selectedEmployee?: EmployeeDetails;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(employee: EmployeeDetails): void {
    this.selectedEmployee = employee;
  }
}