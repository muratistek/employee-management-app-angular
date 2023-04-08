import { Component } from '@angular/core';
import { User } from '../types';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: User = {
    id: "",
    email: "",
    username: "",
    password: ""
  }


  // Define form fields variables
  public login: string = ""
  public password: string = ""

  public message: string = ""
  public loading: boolean = false

  constructor(private apollo: Apollo) { }

  handleLogin(): void {
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
        email_username: this.login,
        password: this.password
      }
    })
      .subscribe(({ data }) => {
        // console.log("data: ", data.getEmployeeByID);
        this.user = data.login;
        this.message = "success";
        localStorage.setItem("currentUserID", this.user.id);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000)
      },
        (error) => {
          this.message = "error";

          setTimeout(() => {
            this.message = "";
          }, 3000)
        }
      )
  }
}
