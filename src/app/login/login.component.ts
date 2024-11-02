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
  
    console.time('Total Login Time'); // Tracks the entire process time
    console.time('Form Validation');   // Tracks time before submitting
    
    const { email, password } = this.loginForm.value;
  
    console.timeEnd('Form Validation'); // End form validation time
  
    console.time('Supabase Sign-In Request'); // Start Supabase call timer
    this.supabaseService.signIn(email, password)
      .then(({ data, error }) => {
        console.timeEnd('Supabase Sign-In Request'); // End Supabase call timer
        console.timeEnd('Total Login Time');         // End total process time
        
        if (error) {
          console.error('Supabase Error:', error);
          alert('Login failed: ' + error.message);
          throw new Error(error.message);
        }
  
        const user = data.user;
        if (user) {
          console.log('User authenticated successfully.');
          this.router.navigate(['/']); 
        }
      })
      .catch(error => {
        console.error('Login error:', error); 
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
  
  
  
  
}