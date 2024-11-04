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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Check if the platform is browser
    if (isPlatformBrowser(this.platformId)) {
      // Define the Google login success callback globally
      window.onGoogleLoginSuccess = this.onGoogleLoginSuccess.bind(this);
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // This function will be called on successful Google login
  onGoogleLoginSuccess(response: any): void {
    const token = response.credential;
    localStorage.setItem('googleToken', token);
    this.router.navigate(['/dashboard']);
  }

  // Form submission logic
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      // Add your form submission logic here
    }
  }
}
