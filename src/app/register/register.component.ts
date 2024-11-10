import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../firebase-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: FirebaseAuthService, private router: Router) {}

  onRegister() {
    this.authService.signUp(this.email, this.password)
      .then(userCredential => {
        console.log('User registered:', userCredential.user);
        this.router.navigate(['/dashboard']); 
      })
      .catch(error => {
        this.error = error.message;
        console.error('Error during registration:', error);
      });
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
