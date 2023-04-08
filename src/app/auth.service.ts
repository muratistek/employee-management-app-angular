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

  logout(): void {
    localStorage.removeItem('currentUserID');
    this.email = "";
    this.username = "";
    this.id = "";
    window.location.href = "/";
  }
}
