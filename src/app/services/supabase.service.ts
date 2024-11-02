import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private authStatus = new BehaviorSubject<boolean>(false);
  private supabaseUrl = 'https://vduerriglvtnzgqvxrxy.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkdWVycmlnbHZ0bnpncXZ4cnh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5MjgxOTIsImV4cCI6MjA0NTUwNDE5Mn0.QeZlQKgtt4RnoMsrxntkopL_FPIavWvai7zFxuCg-Xc';

  constructor() {
    if (environment.supabaseUrl && environment.supabaseKey) {
      this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
      this.supabase.auth.onAuthStateChange((event, session) => {
        this.authStatus.next(!!session);
      });
    } else {
      console.error('Supabase URL and Key are missing');
      throw new Error('Supabase credentials not configured.');
    }
  }
  

  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  async signOut() {
    await this.supabase.auth.signOut();
    this.authStatus.next(false);
  }

  getUser () {
    return this.supabase.auth.getSession();
  }

  isAuthenticated() {
    return this.authStatus.asObservable();
  }
}