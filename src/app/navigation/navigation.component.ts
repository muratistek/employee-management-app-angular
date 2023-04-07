import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  email: string;
  username: string;

  constructor(private auth: AuthService) {
    this.email = auth.email
    this.username = auth.username
  }
}
