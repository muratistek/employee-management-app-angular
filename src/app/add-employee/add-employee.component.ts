import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee, Query } from '../types';

// const GET_EMPLOYEE_BY_ID = 

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employee: Employee = {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    salary: 0,
    gender: ""
  };
  loading = false;
  newEmp: Employee | undefined;
  employeeID!: string | null;

  constructor(private route: ActivatedRoute, private apollo: Apollo) { }

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(): void {
    this.loading = true;
    this.employeeID = this.route.snapshot.paramMap.get('employeeID');

    if (this.employeeID) {
      this.apollo.query<any>({
        query:
          gql`
            query getEmployeeByID($id: String!) {
              getEmployeeByID(id: $id) {
                id
                first_name
                last_name
                email
                gender
                salary
              }
            } 
          `,
        variables: {
          id: this.employeeID
        }
      })
        .subscribe(({ data, loading }) => {
          console.log("data: ", data.getEmployeeByID);
          if (data.getEmployeeByID) {
            this.employee = data.getEmployeeByID;
          }
          this.loading = loading;
        })
    }
  }

  onSubmit(): void {
    this.employeeID = this.route.snapshot.paramMap.get('employeeID');

    // Adding or updating an employee depending on the presence of employeeID url parameter
    if (this.employeeID) {
      this.apollo.mutate<any>({
        mutation: gql`
          mutation updateEmployee($id: String!, $first_name: String!, $last_name: String!, $email: String!, $gender: String!, $salary: Float!) {
            updateEmployee(id: $id, first_name: $first_name,last_name: $last_name, email: $email, gender: $gender, salary: $salary) {
              id
              first_name
              last_name
              email
              gender
              salary
            }
          }
        `,
        variables: {
          id: this.employeeID,
          first_name: this.employee.first_name,
          last_name: this.employee.last_name,
          email: this.employee.email,
          gender: this.employee.gender,
          salary: this.employee.salary
        }
      })
        .subscribe(({ data, loading }) => {
          console.log("Employee updated: ", data.updateEmployee);
          this.loading = loading;
        })
    }
    else {
      this.apollo.mutate<any>({
        mutation: gql`
          mutation addEmployee($first_name: String!, $last_name: String!, $email: String!, $gender: String!, $salary: Float!) {
            addEmployee(first_name: $first_name, last_name: $last_name, email: $email, gender: $gender, salary: $salary){
              id
              first_name
              last_name
              email
              gender
              salary
            }
          }
        `,
        variables: {
          first_name: this.employee.first_name,
          last_name: this.employee.last_name,
          email: this.employee.email,
          gender: this.employee.gender,
          salary: this.employee.salary
        }
      })
        .subscribe(({ data, loading }) => {
          console.log("Employee added: ", data.addEmployee);
          this.loading = loading;
        })
    }
  }
}
