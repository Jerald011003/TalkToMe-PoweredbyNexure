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

  onSubmit() {
    if (this.isLoading || this.loginForm.invalid) return; // Exit if loading or form is invalid
  
    this.isLoading = true; // Indicate loading state
    const { email, password } = this.loginForm.value; // Get form values
  
    // Call the Supabase sign-in method using .then()
    this.supabaseService.signIn(email, password)
      .then(({ data, error }) => {
        this.isLoading = false; // Reset loading state
  
        if (error) {
          console.error('Supabase Error:', error);
          alert('Login failed: ' + error.message); // Show error message
          return; // Exit early if there's an error
        }
  
        const user = data.user;
        if (user) {
          console.log('User authenticated successfully.');
          this.router.navigate(['/']); // Navigate to home on success
        }
      })
      .catch(error => {
        this.isLoading = false; // Ensure loading state is reset on error
        console.error('Login error:', error); // Log unexpected errors
        alert('An unexpected error occurred. Please try again later.'); // Show a generic error message
      });
  }
  
  
  
  
  // !!!NO SUPABASE
  // loginForm!: FormGroup;

  // constructor(private fb: FormBuilder) {}

  // ngOnInit(): void {
  //   this.loginForm = this.fb.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required]],
  //   });
  // }

  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     const formValues = this.loginForm.value;
  //     console.log('Form Submitted:', formValues);
  //     // You can add logic here to simulate a successful login
  //     alert('Login successful!'); // Just for testing
  //   }
  // }
}