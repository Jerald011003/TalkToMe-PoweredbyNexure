import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';  // Import isSupported

import { environment } from '../environments/environment';  // Import the Firebase config

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() {
    // Initialize Firebase with the configuration
    const app = initializeApp(environment.firebaseConfig);

    // Check if Analytics is supported before initializing it
    isSupported().then((supported) => {
      if (supported) {
        const analytics = getAnalytics(app);
        console.log('Firebase Analytics initialized');
      } else {
        console.log('Firebase Analytics is not supported in this environment');
      }
    }).catch(error => {
      console.error('Error checking analytics support:', error);
    });
  }
}
