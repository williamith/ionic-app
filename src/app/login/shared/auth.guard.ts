import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanLoad, UrlSegment, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (!this.authService.getUserIsAuthenticated()) {
      this.router.navigate(['login']);
    }
    return this.authService.getUserIsAuthenticated();
  }
}