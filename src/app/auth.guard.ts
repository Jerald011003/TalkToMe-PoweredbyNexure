import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SupabaseService } from './services/supabase.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private supabaseService: SupabaseService, private router: Router) {}

  canActivate() {
    return this.supabaseService.getUser().then(({ data }) => {
      const isAuthenticated = !!data.session;

      if (!isAuthenticated) {
        this.router.navigate(['/login']);
      }

      return isAuthenticated;
    });
  }
}
