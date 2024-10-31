import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] 
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  
  onSubmit() {
    console.log('User Registration Details:', {
      name: this.name,
      email: this.email,
      password: this.password,
    });

    this.name = '';
    this.email = '';
    this.password = '';
  }
}
