import { Component, OnInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { AppNavbarComponent } from '../navbar/navbar.component';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { GeminiService } from '../gemini.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SkeletonComponent, FormsModule, FooterComponent, AppNavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email: string | null = null; 
  userInput: string = '';
  responses: { title: string; description: string }[] = [];

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

  // sendMessage(): void {
  //   if (this.userInput.trim()) {
  //     const newResponse = {
  //       title: 'User',
  //       description: this.userInput,
  //     };

  //     this.responses.push(newResponse);
  //     this.userInput = '';

  //     setTimeout(() => {
  //       const aiResponse = {
  //         title: 'AI',
  //         description: `You said: ${newResponse.description}`,
  //       };
  //       this.responses.push(aiResponse);
  //     }, 1000);
      
  //   }
  // }

  // !!!AI GEMINI
  prompt: string = '';

  geminiService: GeminiService = inject(GeminiService)

  loading: boolean = false;

  chatHistory: any[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.geminiService.getMessageHistory().subscribe((res) => {
      if(res) {
        this.chatHistory.push(res);
      }    
    })
  }

  async sendData() {
    if(this.prompt && !this.loading){
      this.loading = true;
      const data = this.prompt;
      this.prompt = '';
      await this.geminiService.generateText(data);
      this.loading = false;
      this.prompt = '';
    }
  }
  // great
  formatText(text: string){
    const result = text.replaceAll('*', '');
    return result;
  }
}
