import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email: string = ""
  username: string = ""

  currentUserID: string | undefined;
}
