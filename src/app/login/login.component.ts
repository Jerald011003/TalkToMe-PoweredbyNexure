// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.login(this.email, this.password)
      .then((result) => {
        console.log('Logged in successfully:', result);
      })
      .catch((error) => {
        this.errorMessage = error.message;
        console.error('Login error:', error);
      });
  }
}
