import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class AppNavbarComponent {
  
  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/dashboard']);  
  }

  // navigateToLogin() {
  //   this.router.navigate(['/']); 
  // }

  // navigateToRegister() {
  //   this.router.navigate(['/register']);
  // }

  navigateToAbout() {
    this.router.navigate(['/about']);
  }

  logout() {  
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
  
  
}
