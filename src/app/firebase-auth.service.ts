import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { environment } from '../environments/environment';  

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  private auth = getAuth(); 

  constructor() {
    initializeApp(environment.firebaseConfig);
  }

  isAuthenticated(): boolean {
    const user: User | null = this.auth.currentUser; 
    return !!user;  
  }

  getCurrentUserEmail(): string | null {
    const user = this.auth.currentUser;
    return user ? user.email : null;
  }

  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOutUser() {
    return signOut(this.auth);
  }
}
