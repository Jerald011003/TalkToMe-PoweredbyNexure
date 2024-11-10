import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { FirebaseAuthService } from '../firebase-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: FirebaseAuthService, private router: Router) {}

  onLogin() {
    this.authService.signIn(this.email, this.password)
      .then(userCredential => {
        console.log('User logged in:', userCredential.user);
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        this.error = error.message;
        console.error('Error during login:', error);
      });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);  
  }
}
