import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { AppNavbarComponent } from '../navbar/navbar.component';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent, AppNavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  email: string | null = null; 
  userInput: string = '';
  responses: { title: string; description: string }[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkGoogleToken();
    }
  }

  private checkGoogleToken(): void {
    const token = localStorage.getItem('googleToken'); 
    if (token) {
      console.log('Google Token:', token);
      this.decodeToken(token);
    } else {
      console.log('No Google Token found.');
    }
  }

  private decodeToken(token: string): void {
    try {
      const decoded: any = jwtDecode(token);
      this.email = decoded.email || null; 
      console.log('Decoded Email:', this.email);
      
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  sendMessage(): void {
    if (this.userInput.trim()) {
      const newResponse = {
        title: 'User',
        description: this.userInput,
      };

      this.responses.push(newResponse);
      this.userInput = '';

      setTimeout(() => {
        const aiResponse = {
          title: 'AI',
          description: `You said: ${newResponse.description}`,
        };
        this.responses.push(aiResponse);
      }, 1000);
      
    }
  }
}
