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
  errorMessage: string = ''; 

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    if (this.email === 'jerald@gmail.com' && this.password === '123') {
      this.router.navigate(['/'], { queryParams: { email: this.email } });
    } else {
      this.errorMessage = 'Invalid email or password. Please try again.';
    }
  }
}
