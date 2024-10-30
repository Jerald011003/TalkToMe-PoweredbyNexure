import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Here you would typically make a request to your backend for authentication
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    // Navigate to the home page after successful login
    // You can replace this with actual authentication logic
    this.router.navigate(['/']);
  }
}
