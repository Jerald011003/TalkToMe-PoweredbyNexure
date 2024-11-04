import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = false;

  google_client = environment.googleClient;
  login_url: string = '/dashboard'; // Define your login URL here

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.onGoogleLoginSuccess = this.onGoogleLoginSuccess.bind(this);
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onGoogleLoginSuccess(response: any): void {
    const token = response.credential; 
    localStorage.setItem('googleToken', token);
    // Navigate to the dashboard after successful login
    this.router.navigate([this.login_url]); // Use the login_url variable here
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      // Add your form submission logic here
    }
  }
}
