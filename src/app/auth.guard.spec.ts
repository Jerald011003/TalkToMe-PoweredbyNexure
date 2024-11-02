import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    // Create a mock Router instance
    const mockRouter = {
      navigate: jasmine.createSpy('navigate') // Spy on the navigate method
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: mockRouter } // Provide the mock Router
      ]
    });

    guard = TestBed.inject(AuthGuard); // Get the AuthGuard instance
    router = TestBed.inject(Router); // Get the Router instance
  });

  it('should be created', () => {
    expect(guard).toBeTruthy(); // Test if guard is created
  });

  it('should allow the route when token exists', () => {
    spyOn(localStorage, 'getItem').and.returnValue('dummy_token'); // Mock localStorage.getItem

    const result = guard.canActivate();
    expect(result).toBeTrue(); // Expect guard to return true
  });

  it('should redirect to login when token does not exist', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); // Mock localStorage.getItem to return null

    const result = guard.canActivate();
    expect(result).toBeFalse(); // Expect guard to return false
    expect(router.navigate).toHaveBeenCalledWith(['/']); // Expect router.navigate to be called
  });
});
