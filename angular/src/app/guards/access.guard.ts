// access.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root',
})
export class AccessGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken()
    const user = this.authService.getUser(token);

    if (user && this.authService.isAdmin()) {
      return true; // Allow access for admin users
    } else {
      // Redirect to a different route or show an access denied page
      this.router.navigate(['/']);
      return false;
    }
  }
}
