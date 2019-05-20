import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  email = new FormControl('');
  password = new FormControl('');

  constructor(public authService: AuthService) {}

  login() {
    this.authService.login(this.email.value, this.password.value);
  }

  logout() {
    this.authService.logout();
  }
}
