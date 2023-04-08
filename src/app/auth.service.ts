import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email: string = ""
  username: string = ""
  id: string = ""
  userID = localStorage.getItem('currentUserID');

  constructor(private apollo: Apollo) { }

  login(email_username: string, password: string): void {
    this.apollo.query<any>({
      query:
        gql`
            query login($email_username: String!, $password: String!) {
              login(email_username: $email_username, password: $password) {
                id
                email
                username
                password
              }
            } 
          `,
      variables: {
        email_username: email_username,
        password: password
      }
    })
      .subscribe(({ data }) => {
        console.log("data: ", data.getEmployeeByID);
        if (data.getEmployeeByID) {
          this.email = data.getEmployeeByID.email;
          this.username = data.getEmployeeByID.first_name;
          this.id = data.getEmployeeByID.id;
        }
      })
  }

  checkLogin(): boolean {
    if (this.userID === this.id) {
      return true
    }
    else {
      return false
    }
  }

  logout(): void {
    localStorage.removeItem('currentUserID');
    this.email = "";
    this.username = "";
    this.id = "";
    window.location.href = "/";
  }
}
