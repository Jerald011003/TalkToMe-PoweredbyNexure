import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { LoginComponent } from './login/login.component'; 
import { AppNavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SkeletonComponent } from './skeleton/skeleton.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { environment } from '../environments/environment';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { FirebaseService } from './firebase.service';  // Import the service

const firebaseConfig = {
  apiKey: "AIzaSyARXZOiWbpouDLZQX5Jg8gXkGcDIOy8TVc",
  authDomain: "talk-to-me-63d17.firebaseapp.com",
  projectId: "talk-to-me-63d17",
  storageBucket: "talk-to-me-63d17.firebasestorage.app",
  messagingSenderId: "263087346884",
  appId: "1:263087346884:web:8dafa07008811750862591",
  measurementId: "G-FP2ZF8LGNY"
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SkeletonComponent, AppNavbarComponent, FooterComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularApp';

  constructor(private firebaseService: FirebaseService) {
    // Firebase is already initialized by FirebaseService
    console.log('AppComponent initialized');
  }

}
