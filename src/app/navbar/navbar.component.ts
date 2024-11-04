import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class AppNavbarComponent {
  isMenuOpen: boolean = false;

  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/dashboard']);  
  }

  navigateToAbout() {
    this.router.navigate(['/about']);
  }

  logout() {  
    localStorage.removeItem('googleToken');
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
  
  
}
