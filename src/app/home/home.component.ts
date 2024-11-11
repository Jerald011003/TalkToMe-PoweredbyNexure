import { Component, HostListener, OnInit, Inject, PLATFORM_ID, ViewChild, ElementRef, inject } from '@angular/core';
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
  isSidebarVisible: boolean = true;
  isSidebarOpen = false;
  prompt: string = '';
  geminiService: GeminiService = inject(GeminiService);
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

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (isPlatformBrowser(this.platformId)) {
      if (window.innerWidth < 768) { 
        this.isSidebarVisible = false;
      } else {
        this.isSidebarVisible = true;
      }
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkGoogleToken();
      if (window.innerWidth < 768) { 
        this.isSidebarVisible = false; 
      } else {
        this.isSidebarVisible = true; 
      }
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

  toggleSidebar(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  
    this.isSidebarVisible = this.isSidebarOpen;
  
    const sidebar = document.querySelector('#sidebar');
    const openSidebarBtn = document.querySelector('#openSidebarBtn');
  
    if (this.isSidebarOpen) {
      sidebar?.classList.remove('hidden'); 
      openSidebarBtn?.classList.add('hidden');
    } else {
      sidebar?.classList.add('hidden'); 
      openSidebarBtn?.classList.remove('hidden');
    }
  }
  
  
}
