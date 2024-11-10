import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FirebaseAuthService } from '../firebase-auth.service'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class AppNavbarComponent {
  isMenuOpen: boolean = false;
  userEmail: string | null = null;

  constructor(private router: Router, private authService: FirebaseAuthService) {
    this.userEmail = this.authService.getCurrentUserEmail();  
  }

  navigateToHome() {
    this.router.navigate(['/dashboard']);  
  }

  navigateToAbout() {
    this.router.navigate(['/about']);
  }
  
  logout() {
    this.authService.signOutUser().then(() => { 
      console.log('User logged out');
      this.router.navigate(['/login']);  
    }).catch((error) => {
      console.error('Error during sign-out:', error); 
    });
  }
}
