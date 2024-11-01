import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.isLoading) return; 
    this.isLoading = true;
  
    const { email, password } = this.loginForm.value;
  
    this.supabaseService.signIn(email, password)
      .then(({ data, error }) => {
        if (error) {
          throw new Error(error.message);
        }
  
        const user = data.user; 
        if (user) {
          this.router.navigate(['/']); 
        }
      })
      .catch(error => {
        console.error('Login error:', error); 
        alert('Login failed: ' + error);
      })
      .finally(() => {
        this.isLoading = false; 
      });
  }
  
  
}