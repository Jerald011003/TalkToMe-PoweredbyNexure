import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { environment } from '../environments/environment';  // Import your Firebase config

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  private auth = getAuth(); // Initialize Firebase Authentication

  constructor() {
    // Initialize Firebase app
    initializeApp(environment.firebaseConfig);
  }

    // Check if the user is logged in
  isAuthenticated(): boolean {
    const user: User | null = this.auth.currentUser;  // Get current user
    return !!user;  // Return true if user is authenticated
  }

  getCurrentUserEmail(): string | null {
    const user = this.auth.currentUser;
    return user ? user.email : null;
  }

  // Sign Up method
  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Sign In method
  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Sign Out method
  signOutUser() {
    return signOut(this.auth);
  }
}
