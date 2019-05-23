import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  styleUrls: ['./auth.component.scss'],
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  email = new FormControl('');
  password = new FormControl('');

  constructor(
    public authService: AuthService,
    public router: Router
  ) {}

  login() {
    this.authService.login(this.email.value, this.password.value).then(() => this.router.navigate(['food']));
  }

  logout() {
    this.authService.logout();
  }
}
