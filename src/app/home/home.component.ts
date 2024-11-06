import { Component, OnInit, Inject, PLATFORM_ID, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { AppNavbarComponent } from '../navbar/navbar.component';
import { jwtDecode } from 'jwt-decode';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { GeminiService } from '../gemini.service';
import { Router } from '@angular/router';

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
  
  prompt: string = '';
  geminiService: GeminiService = inject(GeminiService)
  loading: boolean = false;
  chatHistory: any[] = [];

  @ViewChild('sidebar') sidebar!: ElementRef;
  @ViewChild('openSidebarBtn') openSidebarBtn!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private router: Router
  ) {
    this.geminiService.getMessageHistory().subscribe((res) => {
      if (res) {
        this.chatHistory.push(res);
      }    
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkGoogleToken();
    }
  }

  private checkGoogleToken(): void {
    const token = localStorage.getItem('googleToken'); 
    if (token) {
      this.decodeToken(token);
    }
  }

  private decodeToken(token: string): void {
    try {
      const decoded: any = jwtDecode(token);
      this.email = decoded.email || null; 
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  async sendData() {
    if (this.prompt && !this.loading) {
      this.loading = true;
      const data = this.prompt;
      this.prompt = '';
      await this.geminiService.generateText(data);
      this.loading = false;
    }
  }

  formatText(text: string) {
    const result = text.replaceAll('*', '');
    return result;
  }

  navigateToHome() {
    this.router.navigate(['/']);  
  }

  toggleSidebar(show: boolean): void {
    if (show) {
      this.sidebar.nativeElement.style.display = 'block';
      this.openSidebarBtn.nativeElement.style.display = 'none';
    } else {
      this.sidebar.nativeElement.style.display = 'none';
      this.openSidebarBtn.nativeElement.style.display = 'block';
    }
  }
}
