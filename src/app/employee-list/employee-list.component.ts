import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Employee, Query } from '../types';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Observable<Employee[]> | undefined;

  testUser: boolean | null;

  constructor(private apollo: Apollo) {
    this.testUser = window.localStorage.getItem('email') === "test@mail.com" || window.localStorage.getItem('username') === "testUser";
  }

  ngOnInit(): void {
    this.employees = this.apollo.watchQuery<Query>({
      query: gql`
        query getEmployees {
          getEmployees {
            id
            first_name
            last_name
            email
            gender
            salary
          }
        }
      `,
    })
      .valueChanges.pipe(map((result) => result.data.getEmployees))
  }

  deleteEmployee(id: string): void {
    this.apollo.mutate<any>({
      mutation: gql`
          mutation deleteEmployee($id: String!) {
            deleteEmployee(id: $id) {
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
        id: id
      }
    })
      .subscribe(({ data, loading }) => {
        console.log("Employee deleted: ", data.deleteEmployee);
        window.location.href = "/";
      })
  }
}
