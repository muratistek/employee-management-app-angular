import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { User } from '../types';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: User = {
    id: "",
    email: "",
    username: "",
    password: ""
  }

  // Define form fields variables
  public email: string = ""
  public username: string = ""
  public password: string = ""

  public message: string = ""

  constructor(private route: ActivatedRoute, private apollo: Apollo, private router: Router, private auth: AuthService) { }

  handleSignUp(): void {
    console.log("gggg")
  }


}
