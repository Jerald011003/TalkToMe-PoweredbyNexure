import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics'; 
import { environment } from '../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() {
    const app = initializeApp(environment.firebaseConfig);

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
